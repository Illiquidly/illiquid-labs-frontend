import styled from '@emotion/styled'
import { withAttrs } from 'hoc/withAttrs'
import { Box } from 'rebass'

export const Title = withAttrs(
	styled(Box)`
		font-family: 'Pixelade';
		font-style: normal;
		font-weight: normal;
		font-size: 42px;
		color: #e5ecf5;
	`,
	{
		fontSize: [28, 28, 42],
	}
)

export const Card = styled.div`
	flex-direction: column;
	background: #18283d;
	display: flex;
	padding: 16px;
	flex: 1;
	border-radius: 10px;

	border: 1px solid transparent;
	border-radius: 10px;
	background: linear-gradient(0deg, #18283d 0%, #18283d 100%),
		linear-gradient(90deg, #01c46c 0%, #3697f0 100%);
	background-clip: padding-box, border-box;
	background-origin: padding-box, border-box;
`

export const ErrorSection = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: 8px;
`

export const ErrorMessage = withAttrs(
	styled(Box)<{ color?: string }>`
		font-family: 'Biryani';
		font-style: normal;
		font-weight: 400;

		color: ${props => (props.color ? props.color : '#89A8CF')};
	`,
	{
		fontSize: [14, 16],
	}
)

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
		height: [400, 320],
	}
)
