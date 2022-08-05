import styled from '@emotion/styled'
import { Button } from '../Button/Button'

export const OptionPickerContainer = styled.div`
	flex: 1;
	margin-top: 10px;
	margin-bottom: 10px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
	grid-column-gap: 8px;
	grid-row-gap: 8px;
`

export const OptionText = styled.div`
	font-family: 'Biryani';
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
`

export const Option = styled(Button)<{ selected: boolean }>`
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
