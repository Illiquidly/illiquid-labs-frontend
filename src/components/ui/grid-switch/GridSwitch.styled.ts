import styled from '@emotion/styled'

export const Container = styled.div<{ disabled?: boolean }>`
	${props => (props.disabled ? 'cursor: not-allowed;' : 'cursor: pointer;')}
	display: inline-flex;
`

export const Input = styled.input`
	height: 0;
	margin: 0;
	opacity: 0;
	padding: 0;
	position: absolute;
	width: 0;
	z-index: -9999;
`

export const Background = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	padding: 6.35px 4.77px;
	box-sizing: border-box;
	background: ${props => props.theme.colors.dark200};

	border: 1.5px solid ${props => props.theme.colors.dark500};

	box-shadow: inset 0px -0.984615px 0px 0.984615px #0f3a51;
	border-radius: 6.3px;

	&:hover {
		background: ${props => props.theme.colors.dark400};
	}

    &:active {
        background: ${props => props.theme.colors.dark400};
		box-shadow: 0px 0px 0px 4px rgba(63, 138, 224, 0.3);
	},
`

export const Knob = styled.div<{ checked?: boolean }>`
	position: absolute;
	width: 35px;
	height: 35px;
	background: #03273a;
	border-radius: 6.3px;
	transition: 0.4s;

	transform: ${props => props.checked && 'translateX(34px)'};
`

export const BigGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, 7.12px);
	grid-template-rows: repeat(auto-fill, 7.12px);
	grid-column-gap: 4px;
	grid-row-gap: 4px;
	max-width: 22.24px;
	max-height: 22.24px;
`

export const SmallGrid = styled(BigGrid)`
	grid-template-columns: repeat(auto-fill, 6.54px);
	grid-template-rows: repeat(auto-fill, 6.54px);
	grid-column-gap: 1.31px;
	grid-row-gap: 1.31px;
`
export const GridContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 35px;
	height: 35px;
`
