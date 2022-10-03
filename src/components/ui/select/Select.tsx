import styled from '@emotion/styled'
import { Flex } from 'theme-ui'

const Container = styled(Flex)`
	/* background-color: ${props => props.theme.colors.dark400}; */
	border: 2px solid transparent;
	border-radius: 8px;
	flex: 1;
	overflow: hidden;
	/* padding: 4px; */
	/* border: 1px solid ${props => props.theme.colors.dark500}; */
`

const StyledSelect = styled.select`
	background: ${props => props.theme.colors.dark300};
	font-size: 14px;
	font-family: 'Heebo';
	line-height: 20px;
	color: white;
	width: 100%;
	padding: 3px 10px;
	border-radius: 8px;
	cursor: pointer;
	outline: 0;
	border: 1px solid ${props => props.theme.colors.dark500};

	&:focus {
		border: 1px solid ${props => props.theme.colors.primary100};
	}

	&:hover {
		background-color: ${props => props.theme.colors.dark400};
		border: 1px solid ${props => props.theme.colors.dark500};
	}

	&:active {
		background-color: ${props => props.theme.colors.dark400};
		border: 1px solid ${props => props.theme.colors.dark100};
	}
`

const Option = styled.option``

export const Select = ({ sx = {}, selected, options, handleSelect }) => {
	return (
		<Container sx={sx}>
			<StyledSelect onChange={e => handleSelect(e.target.value)} value={selected}>
				{options.map(option => (
					<Option key={option.value} value={option.value}>
						{option.element}
					</Option>
				))}
			</StyledSelect>
		</Container>
	)
}

export default Select
