/**
 * [flamework.utilities.ts] is designed to ease my use of the framework 'flamework'. As long as in your package containing folder you have the attribute 'syn.flamework' it will add the paths to flamework but not ignite!
 */
import { convertFullNameToPath } from './path.utilities';

/** Discovers any flamework packages from a Packages folder. The intent is to populate a string array of paths to provide to flamework. */
function discoverFlameworkPackages(container: Instance): string[] {
	const pkgs: string[] = [];
	for (const pkg of container.GetChildren()) {
		if (pkg.GetAttribute('syn.flamework') === true) {
			const packagePath = convertFullNameToPath(pkg.GetFullName());
			pkgs.push(packagePath);
		}
	}
	return pkgs;
}

export { discoverFlameworkPackages };