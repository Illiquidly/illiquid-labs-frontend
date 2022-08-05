import { withAttrs } from 'hoc/withAttrs'
import { Box } from 'rebass'
import styled from '@emotion/styled'
import { Button } from 'components/ui/Button/Button'

export const Card = styled.div`
	flex: 1;
	flex-direction: column;
	background: #18283d;
	display: flex;
	padding: 16px;

	border: 1px solid transparent;
	border-radius: 10px;
`

export const Title = styled.div`
	font-family: Biryani;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;

	color: #89a8cf;
`

export const LoadingText = withAttrs(
	styled(Box)`
		margin-left: 24px;

		color: rgb(211, 129, 23);
	`,
	{
		marginLeft: [0, 24],
	}
)

export const ActionsContainer = styled.div`
	flex: 1;
	margin-top: 4px;
	margin-bottom: 10px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
	grid-column-gap: 8px;
	grid-row-gap: 8px;
`

export const ButtonText = styled.div`
	font-family: 'Biryani';
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
`

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
		height: [320],
	}
)

export const SelectButton = styled(Button)<{ selected: boolean }>`
	margin: 0;
	display: flex;
	flex-direction: row;
	border: 1px solid #89a8cf !important;
	padding: 0 !important;
	box-sizing: border-box;
	padding: 3px 12px;
	justify-content: center;
	align-items: center;
	height: 22px;
	color: #89a8cf !important;
	background: rgb(24, 40, 61);
	margin-right: 8px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	border-radius: 4px;

	&:hover {
		background: rgb(24, 40, 61) !important;
		cursor: pointer;
	}

	${props =>
		props.selected
			? `
                color: #23354D !important;
        		background: #89a8cf !important;
                border: 1px solid #89a8cf;
                box-sizing: border-box;
                &:hover {
                    background: #89a8cf !important;
					cursor: pointer;
                }
        `
			: ``}
`
