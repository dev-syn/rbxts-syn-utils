import { Modding } from '@flamework/core';
import { Constructor } from '@flamework/core/out/utility';
import { ComponentConfig } from '@flamework/components';

type ConfigurationSchema = { [key: string]: Constructor<Instance> }

export interface ConfigurationComponentOptions extends ComponentConfig {
	/** The map that stores the instance object reference configuration. */
	configuration?: ConfigurationSchema
}

/**
 * @Decorator
 * Marks a class configurable component, this means including a Configuration into the components Instance.
 * Which can then set Instance references within Studio.
 * @metadata flamework:implements flamework:parameters injectable intrinsic-component-decorator
 */
export const ConfigurationComponent = Modding.createMetaDecorator<[ConfigurationComponentOptions]>("Class");