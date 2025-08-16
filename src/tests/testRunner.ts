import { BaseComponent } from '@flamework/components';
import { ConfigurationComponent } from '../flamework/configuration';
import { OnStart } from '@flamework/core';

@ConfigurationComponent({
	configuration: {
		"Test": Instance
	}
})
class TestComponent extends BaseComponent implements OnStart {
	onStart(): void {
		warn("test component started.");
	}
}