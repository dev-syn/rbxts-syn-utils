/**
 * Converts a Roblox instances  full name to a path-like notation.
 */
function convertFullNameToPath(fullName: string): string {
	const paths: string[] = fullName.split('.');
	return paths.join('/');
}

/**
 * Resolves a Roblox Instance from a path to the instance excluding the 'game' DataModel.
 * 
 * - Don't provide **game** to the path, it is automatically included. e.g., "src/"
 * - Any dots present in any {Instance.Name} properties within the given 'path' is not supported and, will result in failure to resolve the path.
 * - **Edge Case:** You have an Instance of any kind with the same name in the same location which a different type will result in the item possibly being found but not with the expected item.
 * @param path A string which uses {dot or forward-slash path} notation
 * @returns The Instance of type T or undefined when no path was resolved
 */
function resolveInstance<T extends keyof Instances>(path: string,className: T): Instances[T] | undefined {
	path = convertFullNameToPath(path);
	const pathSegments: string[] = path.split('/');

	let currentInst: Instance | undefined = game;
	for (let i = 0; i < pathSegments.size(); i++) {
		const segment: string = pathSegments[i];

		currentInst = currentInst.FindFirstChild(segment);
		if (!currentInst) {
			warn(`Could not find instance in path segment\nindex=${i} segment=${segment}\npath=${path}`);
			return;
		}
	}

	if (currentInst.IsA(className)) return currentInst;
	else {
		warn(`Found instance at path=${path},\nbut it was of type=${currentInst?.ClassName ?? 'nil'}\nexpected=${className}`);
		return undefined;
	}
}

export { convertFullNameToPath, resolveInstance };