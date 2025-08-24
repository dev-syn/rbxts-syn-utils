import { BaseComponent, Components } from '@flamework/components';
import { Modding, Service } from '@flamework/core';
import { Configurable, ConfigurableOptions } from './decorator';
import { $warn, $error } from 'rbxts-transform-debug';
import { Constructor } from '@flamework/core/out/utility';
import Maid from '@rbxts/maid';

@Service({
	loadOrder: 9999
})
export class ConfigurationService {

	private _configuredClasses = new Map<Constructor,ConfigurableOptions>;
	private _componentMaids = new Map<BaseComponent,Maid>;

	constructor(private readonly components: Components) {
		const decoratedClasses = Modding.getDecorators<typeof Configurable>();
		
		for (const { object: componentClass, arguments: args } of decoratedClasses) {
			this._configuredClasses.set(componentClass as Constructor, args[0]);
		}

		this.components.onComponentAdded<BaseComponent>((component) => {
			const componentClass = getmetatable(component) as Constructor;

			const options = this._configuredClasses.get(componentClass);
			if (options) this._hydrateConfiguration(component,options);
		});

		this.components.onComponentRemoved<BaseComponent>((component) => {
			const maid = this._componentMaids.get(component);
			if (maid) maid.Destroy();
			this._componentMaids.delete(component);
		});
	}

	private _hydrateConfiguration(component: BaseComponent,options: ConfigurableOptions) {
		const schema = options.schema;
		if (!schema)
			$error("No configuration schematic object but using ConfigurationComponent decorator? Include a schematic object for .configuration inside the Decorator options.",2);

		// Constuct the maid for this component
		const maid = new Maid;
		this._componentMaids.set(component,maid);

		const internalData: { [key: string]: unknown } = {};

		let configFolder = component.instance.FindFirstChildOfClass("Configuration");
		if (!configFolder) {
			configFolder = new Instance("Configuration");
			configFolder.Parent = component.instance;
		}

		const proxy = setmetatable({},{
			__index: (t,k) => internalData[k as string],
			__newindex: (t,k,v) => {
				const key = k as string;
				const validator = schema[key];

				if (!validator || !validator(v)) {
					$warn(`Attempted to assign an invalid value to configuration.'${key}'.`);
					return;
				}
				internalData[key] = v;
				const objectVal = configFolder.FindFirstChild(key);
				if (objectVal && objectVal.IsA("ObjectValue")) {
					objectVal.Value = v as Instance;
				}
			}
		}) as { [key: string]: unknown};

		for (const [prop,validator] of pairs(schema)) {
			const propName = prop as string;
			
			let objectVal = configFolder.FindFirstChild(propName);
			if (!objectVal || !objectVal.IsA("ObjectValue")) {
				objectVal = this._createOV(propName,configFolder);
				maid.GiveTask(objectVal);
			}

			const linkedValue = (objectVal as ObjectValue).Value;
			if (linkedValue !== undefined && validator(linkedValue)) {
				internalData[propName] = linkedValue;
			}

			const ovChangedConn = (objectVal as ObjectValue).Changed.Connect((inst) => {
				if (!inst) internalData[propName] = undefined;
				else if (validator(inst)) internalData[propName] = inst;
			});
			maid.GiveTask(ovChangedConn);
		}
		(component as any).configuration = proxy;
	}

	private _createOV(name: string,parent: Instance): ObjectValue {
		const i: ObjectValue = new Instance("ObjectValue");
		i.Name = name;
		i.Parent = parent;
		return i;
	}

}