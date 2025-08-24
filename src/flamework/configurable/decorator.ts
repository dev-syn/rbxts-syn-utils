import { Modding } from '@flamework/core';
import { ComponentConfig } from '@flamework/components';
import { t } from '@rbxts/t';

/**
 * Defines the shape of a configuration schema using runtime validators from the t library.
 */
export type ConfigurationSchema = { [key: string]: t.check<any> };

/**
 * A utility type that infers a static TypeScript type from a t-schema.
 * This provides compile-time type safety for the configuration object.
 */
export type SchemaToType<S extends ConfigurationSchema> = {
    [K in keyof S]: t.static<S[K]>;
};

export interface ConfigurableOptions extends ComponentConfig {
	/** The map that stores the instance object reference configuration. */
	schema?: ConfigurationSchema
}

/**
 * @Decorator
 * Marks a class configurable component, this means including a Configuration into the components Instance.
 * Which can then set Instance references within Studio.
 * @metadata flamework:implements flamework:parameters injectable intrinsic-component-decorator
 */
export const Configurable = Modding.createMetaDecorator<[ConfigurableOptions]>("Class");