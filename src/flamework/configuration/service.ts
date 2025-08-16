import { BaseComponent, Component, Components } from '@flamework/components';
import { Modding, OnStart, Service } from '@flamework/core';
import { ConfigurationComponent } from './component';
import { t } from '@rbxts/t';
import { $warn, $error } from 'rbxts-transform-debug';

@Service({
	loadOrder: 9999
})
export class ConfigurationService implements OnStart {

	constructor(private readonly components: Components) {}

	onStart(): void {
		const decoratedClasses = Modding.getDecorators<typeof ConfigurationComponent>();

		for (const { object: ctor, arguments: args } of decoratedClasses) {
			const options = args[0];

			Component(options)(ctor);

			this.components.onComponentAdded<BaseComponent>((component) => {
				const schema = options.configuration;
				if (!schema)
					$error("No configuration schematic object but using ConfigurationComponent decorator? Include a schematic object for .configuration inside the Decorator options.");
				
				const configuration: { [key: string]: unknown } = {};
				// Add the created configuration object to the component class.
				(component as any).configuration = configuration;

				let config = component.instance.FindFirstChildOfClass("Configuration");
				if (!config) {
					config = new Instance("Configuration");
					config.Parent = component.instance;
				}

				for (const [propName,expectedType] of pairs(schema)) {
					if (!typeIs(propName,"string")) return;
					
					let objectVal = config.FindFirstChild(propName);
					if (!objectVal) {
						objectVal = this._createOV(propName,config);
					} else if (!t.instanceIsA("ObjectValue")(objectVal)) {
						$warn(`Conflicting Instance named ${propName} is not of type 'ObjectValue' but specified inside the component.configuration object.`);
						objectVal = this._createOV(propName,config);
					}

					const linkedValue = (objectVal as ObjectValue).Value;

					// Check if no value was assigned to an ObjectValue
					if (linkedValue === undefined) {
						$warn(`No Instance was referenced in the ObjectValue.Value inside Instance at:\n${component.instance.GetFullName()}`);
						continue;
					}

					const expectedClassName = (expectedType as unknown as { name: string }).name as keyof Instances;
					if (!t.instanceIsA(expectedClassName)(linkedValue)) {
						$warn(`Invalid expected configuration value, expected a type of '${expectedClassName}' but got '${typeOf(linkedValue)}'.`);
						continue;
					}

					configuration[propName] = linkedValue;
				}
			},ctor as any);
		}
	}

	private _createOV(name: string,parent: Instance): ObjectValue {
		const i: ObjectValue = new Instance("ObjectValue");
		i.Name = name;
		i.Parent = parent;
		return i;
	}

}