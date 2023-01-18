import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

export const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100%;

	background: ${props => props.theme.colors.dark200};
`

export const ModalHeader = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 59px;
	padding: 0 24px;
`

export const ModalBody = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 0 24px;
	padding-bottom: 24px;
	overflow: auto;
`

export const FiltersContainer = styled.div`
	display: flex;
	gap: 37px;
	margin-top: 12px;
	flex-direction: column;
`

export const FilterAction = styled.div`
	display: flex;
	flex: 1;
	margin-top: 0;
	align-items: center;
	justify-content: flex-end;
`

export const CheckboxesContainer = styled(FiltersContainer)`
	margin-top: 45px;
	flex: 1;
`

export const FilterSection = styled(Flex)`
	align-items: center;
	height: 27px;
	justify-content: space-between;
`

export const FilterText = styled.div`
	margin-left: 19px;
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 16px;

	color: ${props => props.theme.colors.natural50};
`
