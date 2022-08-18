const breakpoints: string[] & {
	sm?: string
	md?: string
	lg?: string
	xl?: string
	xxl?: string
} = ['360px', '768px', '1024px', '1280px', '1600px']

const [sm, md, lg, xl, xxl] = breakpoints
breakpoints.sm = sm
breakpoints.md = md
breakpoints.lg = lg
breakpoints.xl = xl
breakpoints.xxl = xxl

export const theme = {
	breakpoints,
	fontSizes: [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72], // Reference: https://www.figma.com/file/aqJA7DTloCuC7LsVlwHzBb/Illiquidly-Labs-(Internal)?node-id=700%3A167217
	colors: {
		dark100: '#011D2C',
		dark200: '#013049',
		dark300: '#013049',
		dark400: '#012539',
		dark500: '#395E71',

		gray100: '#000000',
		gray200: '#232530',
		gray300: '#58667E',
		gray400: '#4B5563',
		gray500: '#6B7280',
		gray600: '#9CA3AF',
		gray700: '#CFD6E4',
		gray800: '#EFF2F5',
		gray900: '#F9FAFB',
		gray1000: '#FFFFFF',

		primary90: 'linear-gradient(80.27deg, #1453CD -20.95%, #62CEFD 112.08%)',
		primary100: '#2463EB',
		primary200: '#4A87FF',
		primary300: '#5995C6',
		primary400: '#F0F6FF',
		primary500: '#F8FAFD',
		primary600: 'rgba(45, 115, 255, 0.1)',

		success100: '#22C55E',
		success200: '#16A34A',
		success300: '#16A34A',
		success400: 'rgba(34, 197, 94, 0.2)',

		error100: '#EA3943',
		error200: '#FF3B30',
		error300: '#DC2626',
		error400: 'rgba(255, 59, 48, 0.2)',

		warning100: '#FF6628',
		warning200: '#F59E0B',
		warning300: '#D97706',
		warning400: '#FDE68A',
	},
	space: [0, 4, 8, 16, 32, 64, 128, 256],
	fonts: {},
	fontWeights: {
		regular: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
	},
	shadows: {
		small: '0px 1px 2px rgba(16, 24, 40, 0.05)',
		large: '0px 1px 2px rgba(16, 24, 40, 0.05)',
	},
	variants: {},
}
