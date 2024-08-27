export type ModalStep = {
	name: string;
	isCompleted: boolean;
};

export type ModalStatus = {
	isSubmitDisabled: boolean;
	message: string;
	completionSteps: ModalStep[];
	progress: number;
};
