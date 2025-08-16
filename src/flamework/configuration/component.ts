import { Modding } from '@flamework/core';
import { ComponentConfig } from '@flamework/components';
import { t } from '@rbxts/t';

type ConfigurationSchema = { [key: string]: t.check<any> }

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