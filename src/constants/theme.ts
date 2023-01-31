import { Theme } from 'theme-ui'

const makeTheme = <T extends Theme>(t: T) => t

export const theme = makeTheme({
	breakpoints: ['680px', '1024px', '1280px', '1600px'],
	fontSizes: [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72], // Reference: https://www.figma.com/file/aqJA7DTloCuC7LsVlwHzBb/Illiquidly-Labs-(Internal)?node-id=700%3A167217
	zIndices: {
		backgroundImages: -100,
		listingCardImg: 100,
		listingCardImageOverlay: 110,
		listingCardOverlay: 150,
		headerDropdown: 1080,
		headerPopup: 1100,
		headerPopupBackgroundOverlay: 1090,
		// modals need to be higher than img
		header: 1000,
		modal: 2000,
		dropdown: 3000,
	},
	colors: {
		dark100: '#011D2C',
		dark200: '#013049',
		dark300: '#013049',
		dark400: '#012539',
		dark500: '#395E71',
		dark600: '#0E405A',

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

		natural50: '#F9FAFB',
		natural200: '#E5E7EB',
		natural300: '#D1D5DB',
		natural500: '#6B7280',
		neutral900: '#111827',

		primary90: 'linear-gradient(80.27deg, #1453CD -20.95%, #62CEFD 112.08%)',
		primary100: '#2463EB',
		primary200: '#4A87FF',
		primary300: '#5995C6',
		primary400: '#F0F6FF',
		primary500: '#F8FAFD',
		primary600: 'rgba(45, 115, 255, 0.1)',

		secondary100: '#B3C1C8',
		secondary200: '#8098A4',
		secondary300: '#5A7889',
		secondary400: '#395E71',
		secondary500: '#013049',
		secondary600: '#012539',
		secondary700: '#011D2C',

		success100: '#22C55E',
		success200: '#16A34A',
		success300: '#16A34A',
		success400: 'rgba(34, 197, 94, 0.2)',
		success600: '#16A34A',

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
	fonts: {
		body: 'Inter',
	},
	fontWeights: {
		regular: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
	},
	buttons: {
		sizes: {
			small: {
				padding: '8px 16px',
				fontWeight: 600,
				fontSize: '14px',
				lineHeight: '20px',
			},
			medium: {
				padding: '10px 16px',
				fontWeight: '600',
				fontSize: '14px',
				lineHeight: '20px',
			},
			large: {
				padding: '7px 20px',
				fontWeight: 500,
				fontSize: '18px',
				lineHeight: '30px',
			},
			extraLarge: {
				padding: '13px 24px',
				fontWeight: 600,
				fontSize: '18px',
				lineHeight: '30px',
			},
		},
		primary: {
			userSelect: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			bg: 'primary100',
			boxShadow: 'inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15)',
			borderRadius: '8px',
			'&:hover': {
				cursor: 'pointer',
				bg: 'primary200',
				boxShadow: 'inset 0px -1px 0px 1px rgba(15, 58, 81, 0.3)',
			},
			'&:active': {
				cursor: 'pointer',
				bg: 'primary200',
				boxShadow: '0px 0px 0px 4px rgba(63, 138, 224, 0.3)',
			},
			'&:disabled': {
				cursor: 'not-allowed',
				background: 'dark400',
				boxShadow: 'inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15)',
				color: 'dark500',
			},
		},
		secondary: {
			userSelect: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			bg: 'dark300',
			borderStyle: 'solid',
			borderWidth: '1px',
			borderColor: 'dark500',
			boxShadow: 'inset 0px -1px 0px 1px rgba(36, 88, 116, 0.4)',
			borderRadius: '8px',
			'&:hover': {
				cursor: 'pointer',
				bg: 'dark400',
				borderStyle: 'solid',
				borderWidth: '1px',
				borderColor: 'dark500',
			},
			'&:active': {
				cursor: 'pointer',
				bg: 'dark400',
				boxShadow: '0px 0px 0px 4px rgba(63, 138, 224, 0.3)',
			},
			'&:disabled': {
				background: 'dark400',
				boxShadow: 'inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15)',
				color: 'dark500',
				cursor: 'not-allowed',
				border: 'none',
			},
		},
		ghost: {
			userSelect: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			bg: 'dark400',
			borderWidth: '1px',
			borderStyle: 'solid',
			borderColor: 'primary100',
			boxShadow: 'inset 0px -1px 0px 1px rgba(36, 88, 116, 0.4)',
			borderRadius: '8px',
			'&:hover': {
				cursor: 'pointer',
				bg: 'rgba(45, 115, 255, 0.3)',
				borderWidth: '1px',
				borderStyle: 'solid',
				borderColor: 'primary100',
				boxShadow: 'none',
			},
			'&:active': {
				cursor: 'pointer',
				bg: 'primary100',
			},
			'&:disabled': {
				background: 'dark400',
				boxShadow: 'inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15)',
				color: 'dark500',
				cursor: 'not-allowed',
				border: 'none',
			},
		},
		destructive: {
			userSelect: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			bg: 'error100',
			boxShadow: 'inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15)',
			borderRadius: '8px',
			'&:hover': {
				cursor: 'pointer',
				bg: 'error100',
				boxShadow: '0px 0px 0px 4px rgba(224, 63, 63, 0.3)',
			},
			'&:active': {
				cursor: 'pointer',
				bg: 'error300',
			},
			'&:disabled': {
				background: 'dark400',
				boxShadow: 'inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15)',
				color: 'dark500',
				cursor: 'not-allowed',
				border: 'none',
			},
		},
		dark: {
			userSelect: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			bg: 'dark500',
			borderRadius: '8px',
			borderWidth: '2px',
			borderStyle: 'solid',
			borderColor: 'dark500',
			'&:hover': {
				cursor: 'pointer',
				bg: '#4F798E',
				borderWidth: '2px',
				borderStyle: 'solid',
				borderColor: 'primary200',
				boxShadow: '0px 0px 0px 4px rgba(63, 138, 224, 0.3)',
			},
			'&:active': {
				cursor: 'pointer',
				bg: 'dark300',
				borderWidth: '2px',
				borderStyle: 'solid',
				borderColor: 'dark300',
				boxShadow: 'inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15)',
			},
			'&:disabled': {
				background: 'dark400',
				boxShadow: 'inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15)',
				color: 'dark500',
				cursor: 'not-allowed',
				border: 'none',
			},
		},
		gradient: {
			border: 0,
			userSelect: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: 'primary90',
			borderRadius: '8px',
			boxShadow: 'inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15)',
			'&:hover': {
				cursor: 'pointer',
				background: 'primary90',
				boxShadow: '0px 0px 0px 4px rgba(63, 138, 224, 0.3)',
			},
			'&:active': {
				cursor: 'pointer',
				background: 'primary90',
				borderStyle: 'solid',
				borderColor: 'dark300',
				boxShadow: 'inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15)',
			},
			'&:disabled': {
				background: 'dark300',
				boxShadow: 'inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15)',
				color: 'dark500',
				cursor: 'not-allowed',
				border: 'none',
			},
		},
		select: {
			userSelect: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			bg: 'dark300',
			borderStyle: 'solid',
			borderWidth: '1px',
			borderColor: 'dark500',
			boxShadow: 'inset 0px -1px 0px 1px rgba(36, 88, 116, 0.4)',
			borderRadius: '8px',
			'&:hover': {
				cursor: 'pointer',
				bg: 'dark400',
				borderStyle: 'solid',
				borderWidth: '1px',
				borderColor: 'dark500',
			},
			'&:active': {
				cursor: 'pointer',
				bg: 'dark400',
				boxShadow: '0px 0px 0px 4px rgba(63, 138, 224, 0.3)',
				borderColor: 'primary100',
			},
			'&:disabled': {
				background: 'dark400',
				boxShadow: 'inset 0px -1px 0px 1px rgba(0, 0, 0, 0.15)',
				color: 'dark500',
				cursor: 'not-allowed',
				border: 'none',
			},
		},
	},
	text: {
		display2xlRegular: {
			fontSize: 10,
			fontWeight: 'regular',
			color: 'gray900',
		},
		display2xlMedium: {
			fontSize: 10,
			fontWeight: 'medium',
			color: 'gray900',
		},
		display2xlSemibold: {
			fontSize: 10,
			fontWeight: 'semibold',
			color: 'gray900',
		},
		display2xlBold: {
			fontSize: 10,
			fontWeight: 'bold',
			color: 'gray900',
		},

		displayXlRegular: {
			fontSize: 9,
			fontWeight: 'regular',
			color: 'gray900',
		},

		displayXlMedium: {
			fontSize: 9,
			fontWeight: 'medium',
			color: 'gray900',
		},

		displayXlSemibold: {
			fontSize: 9,
			fontWeight: 'semibold',
			color: 'gray900',
		},

		displayXlBold: {
			fontSize: 9,
			fontWeight: 'bold',
			color: 'gray900',
		},

		displayLgRegular: {
			fontSize: 8,
			fontWeight: 'regular',
			color: 'gray900',
		},

		displayLgMedium: {
			fontSize: 8,
			fontWeight: 'medium',
			color: 'gray900',
		},

		displayLgSemibold: {
			fontSize: 8,
			fontWeight: 'semibold',
			color: 'gray900',
		},

		displayLgBold: {
			fontSize: 8,
			fontWeight: 'bold',
			color: 'gray900',
		},

		displayMdRegular: {
			fontSize: 7,
			fontWeight: 'regular',
			color: 'gray900',
		},

		displayMdMedium: {
			fontSize: 7,
			fontWeight: 'medium',
			color: 'gray900',
		},

		displayMdSemibold: {
			fontSize: 7,
			fontWeight: 'semibold',
			color: 'gray900',
		},

		displayMdBold: {
			fontSize: 7,
			fontWeight: 'bold',
			color: 'gray900',
		},

		displaySmRegular: {
			fontSize: 6,
			fontWeight: 'regular',
			color: 'gray900',
		},

		displaySmMedium: {
			fontSize: 6,
			fontWeight: 'medium',
			color: 'gray900',
		},

		displaySmSemibold: {
			fontSize: 6,
			fontWeight: 'semibold',
			color: 'gray900',
		},

		displaySmBold: {
			fontSize: 6,
			fontWeight: 'bold',
			color: 'gray900',
		},

		displayXsRegular: {
			fontSize: 5,
			fontWeight: 'regular',
			color: 'gray900',
		},

		displayXsMedium: {
			fontSize: 5,
			fontWeight: 'medium',
			color: 'gray900',
		},

		displayXsSemibold: {
			fontSize: 5,
			fontWeight: 'semibold',
			color: 'gray900',
		},

		displayXsBold: {
			fontSize: 5,
			fontWeight: 'bold',
			color: 'gray900',
		},

		textXlRegular: {
			fontSize: 4,
			fontWeight: 'regular',
			color: 'gray900',
		},

		textXlMedium: {
			fontSize: 4,
			fontWeight: 'medium',
			color: 'gray900',
		},

		textXlSemibold: {
			fontSize: 4,
			fontWeight: 'semibold',
			color: 'gray900',
		},

		textXlBold: {
			fontSize: 4,
			fontWeight: 'bold',
			color: 'gray900',
		},

		textLgRegular: {
			fontSize: 3,
			fontWeight: 'regular',
			color: 'gray900',
		},

		textLgMedium: {
			fontSize: 3,
			fontWeight: 'medium',
			color: 'gray900',
		},

		textLgSemibold: {
			fontSize: 3,
			fontWeight: 'semibold',
			color: 'gray900',
		},

		textLgBold: {
			fontSize: 3,
			fontWeight: 'bold',
			color: 'gray900',
		},

		textMdRegular: {
			fontSize: 2,
			fontWeight: 'regular',
			color: 'gray900',
		},

		textMdMedium: {
			fontSize: 2,
			fontWeight: 'medium',
			color: 'gray900',
		},

		textMdSemibold: {
			fontSize: 2,
			fontWeight: 'semibold',
			color: 'gray900',
		},

		textMdBold: {
			fontSize: 2,
			fontWeight: 'bold',
			color: 'gray900',
		},

		textSmRegular: {
			fontSize: 1,
			fontWeight: 'regular',
			color: 'gray900',
		},

		textSmMedium: {
			fontSize: 1,
			fontWeight: 'medium',
			color: 'gray900',
		},

		textSmSemibold: {
			fontSize: 1,
			fontWeight: 'semibold',
			color: 'gray900',
		},

		textSmBold: {
			fontSize: 1,
			fontWeight: 'bold',
			color: 'gray900',
		},

		textXsRegular: {
			fontSize: 0,
			fontWeight: 'regular',
			color: 'gray900',
		},

		textXsMedium: {
			fontSize: 0,
			fontWeight: 'medium',
			color: 'gray900',
		},

		textXsSemibold: {
			fontSize: 0,
			fontWeight: 'semibold',
			color: 'gray900',
		},

		textXsBold: {
			fontSize: 0,
			fontWeight: 'bold',
			color: 'gray900',
		},
	},
	variants: {
		appContainer: {
			width: '100%',
			minHeight: '100vh',
			flexDirection: 'column',
		},
	},
	shadows: {
		small: '0px 1px 2px rgba(16, 24, 40, 0.05)',
		large: '0px 1px 2px rgba(16, 24, 40, 0.05)',
	},
})

export type ExactTheme = typeof theme
