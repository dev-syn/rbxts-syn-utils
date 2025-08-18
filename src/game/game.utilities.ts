import Object from '@rbxts/object-utils';

function getEnumKeyFromValue<E extends object>(enumObject: E,enumValue: E[keyof E]): keyof E | undefined {
	for (const [key,value] of Object.entries(enumObject)) {
		if (value === enumValue) return key as keyof E;
	}
	return undefined;
}

export { getEnumKeyFromValue };