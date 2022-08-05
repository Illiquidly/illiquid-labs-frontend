import styled from '@emotion/styled'
import { withAttrs } from 'hoc/withAttrs'
import { Box, Flex } from 'rebass'

export const GridContainer = withAttrs(
	styled(Box)`
		flex: 1;
		display: grid;
		padding-right: 12px;

		overflow-y: scroll;

		::-webkit-scrollbar {
			width: 10px;
		}

		/* Track */
		::-webkit-scrollbar-track {
			background: #23354d;
			border-radius: 0px;
		}

		/* Handle */
		::-webkit-scrollbar-thumb {
			background: #566e8e;
			border-radius: 0px;
		}

		/* Handle on hover */
		::-webkit-scrollbar-thumb:hover {
			background: #8caad0;
		}

		grid-column-gap: 12px;
		grid-row-gap: 12px;
	`,
	{
		sx: {
			gridTemplateColumns: [
				'repeat(auto-fill, minmax(200px, 1fr))',
				'repeat(auto-fill, minmax(239px, 1fr))',
			],
		},
	}
)

export const CardTitle = styled.div<{ color?: string }>`
	font-family: 'Biryani';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;

	color: ${props => (props.color ? props.color : '#89A8CF')};
`

export const Card = styled.div<{ isGradient?: boolean }>`
	flex-direction: column;
	background: #18283d;
	display: flex;
	padding: 16px;
	border-radius: 10px;

	${props =>
		props.isGradient
			? `
				border: 1px solid transparent;
				border-radius: 10px;
				background: linear-gradient(0deg, #18283d 0%, #18283d 100%), linear-gradient(90deg, #01C46C 0%, #3697F0 100%);
				background-clip: padding-box, border-box;
				background-origin: padding-box, border-box;
	
	`
			: ''}
`

export const FeeCard = withAttrs(
	styled(Box)`
		flex-direction: row;
		align-items: center;
		padding: 10px 14px;
		margin-right: 14px;
		border-radius: 4px;
		background: #18283d;
	`,
	{
		marginRight: [0, 2],
		marginTop: ['14px', 0],
	}
)

export const FeeText = styled.div`
	font-family: Pixelade;
	font-size: 22px;
`

export const SectionTitle = styled.div`
	font-family: Biryani;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	display: flex;
	align-items: center;

	color: #89a8cf;
`

export const ProgressBarLabelContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 4px 0px;
`

export const LoadingText = withAttrs(
	styled(Box)`
		margin-left: 24px;

		color: rgb(211, 129, 23);
	`,
	{
		marginLeft: [0, '24px'],
	}
)

export const ClaimSection = withAttrs(
	styled(Flex)`
		padding-bottom: 24px;
		justify-content: flex-end;
	`,
	{
		flexDirection: ['column', 'row'],
	}
)

export const ButtonContainer = withAttrs(
	styled(Flex)`
		display: flex;
	`,
	{
		marginTop: ['24px', 0],
		width: '100%',
	}
)
