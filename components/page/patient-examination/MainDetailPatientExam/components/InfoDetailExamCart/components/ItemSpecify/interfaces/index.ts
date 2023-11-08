export interface TypeItemSpecify {
	data: {
		isCanDelete: boolean;
		name: string;
		result: string | null;
		state: {id: number; name: string};
		timeCreated: string;
		timeUpdated: string | null;
		uuid: string;
		description: string;
	};
}
