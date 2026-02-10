// place files you want to import through the `$lib` alias in this folder.

export const formRoutes = [
	'/dream-safe-demo/form',
	'/dream-safe-demo/form/loss-type',
	'/dream-safe-demo/form/third-parties',
	'/dream-safe-demo/form/police-emergency',
	'/dream-safe-demo/form/policy-status',
	'/dream-safe-demo/form/photo-document',
	'/dream-safe-demo/form/claim-assessment'
];

export const radioOptions = [
	{
		label: 'Auto Loss',
		value: 'autoloss',
		description:
			'Select if your vehicle was damaged; this includes theft, collisions, accidents, etc.',
		icon: '/car.svg'
	},
	{
		label: 'Home Loss',
		value: 'homeloss',
		description: 'Select if your home was damaged; this includes theft, water damage, storms, etc.',
		icon: '/house.svg'
	}
];

export const forms = {
	autoLossOptions: [
		{ value: 'collision', label: 'Collision' },
		{ value: 'theft', label: 'Theft' },
		{ value: 'vandalism', label: 'Vandalism' },
		{ value: 'animal', label: 'Animal' },
		{ value: 'fire damage', label: 'Fire Damage' },
		{ value: 'glass damage', label: 'Glass Damage' },
		{ value: 'weather damage', label: 'Weather Damage' }
	],

	homeLossOptions: [
		{ value: 'fire damage', label: 'Fire Damage' },
		{ value: 'storm damage', label: 'Storm Damage' },
		{ value: 'flood', label: 'Flood' },
		{ value: 'water damage', label: 'Water Damage' },
		{ value: 'vandalism', label: 'Vandalism' },
		{ value: 'burglary', label: 'Burglary' }
	]
};

export const relationValues = [
	{ value: 'relative', label: 'Relative' },
	{ value: 'witness', label: 'Witness' },
	{ value: 'involved', label: 'Involved' },
	{ value: 'dependent', label: 'Dependent' }
];

export const progressStepValues = [
	{ id: 1, label: 'Claim in review', value: 'Active', description: 'Active' },
	{ id: 2, label: 'Agent Follow up', value: 'desactive', description: '<48 hours' },
	{ id: 3, label: 'Appraisal', value: 'desactive', description: '7-15 bus. days' },
	{ id: 4, label: 'Payment', value: 'desactive', description: '2-3 weeks' }
];
