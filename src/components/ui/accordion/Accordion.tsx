import React from 'react'
import styled from '@emotion/styled'
import { Box, Flex } from 'theme-ui'
import {
	AccordionChevronDownIcon,
	AccordionChevronUpIcon,
} from 'assets/icons/mixed'

const AccordionContent = styled.div<{ isOpen?: boolean }>`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	background: ${props => props.theme.colors.dark300};

	border: 2px solid
		${props =>
			props.isOpen ? props.theme.colors.primary100 : props.theme.colors.dark500};
	border-radius: 8px;

	box-shadow: ${props =>
		props.isOpen && '0px 0px 0px 4px rgba(63, 138, 224, 0.3)'};
	padding: 14.5px 18px;
`

const AccordionWrapper = styled(AccordionContent)<{ isOpen?: boolean }>`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	&:hover {
		cursor: pointer;

		border: 2px solid ${props => props.theme.colors.primary100};

		box-shadow: 0px 0px 0px 4px rgba(63, 138, 224, 0.3);
	}
`

const AccordionContentWrapper = styled.div<{ isOpen: boolean }>`
	width: 100%;
	max-height: ${props => (props.isOpen ? 'unset' : '0')};
	transition: all 1.35s ease-in-out;
	overflow: hidden;
	display: flex;
`

const Container = styled(Flex)`
	flex-direction: column;
	gap: 8px;
`

export const AccordionTitle = styled(Box)`
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 27px;
`

type AccordionRef = {
	open: () => void
	close: () => void
}

type AccordionProps = {
	children?: React.ReactNode | React.ReactNode[]
	title?: React.ReactNode | string
	icon?: React.ReactNode
}

const Accordion = React.forwardRef<AccordionRef, AccordionProps>(
	(props, ref) => {
		const { children, title, icon } = props
		const [isOpen, setIsOpen] = React.useState(false)

		const open = () => setIsOpen(true)

		const close = () => setIsOpen(false)

		React.useImperativeHandle(ref, () => ({
			open,
			close,
		}))

		return (
			<Container>
				<AccordionWrapper
					isOpen={isOpen}
					onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
				>
					<Flex sx={{ alignItems: 'center', gap: icon ? '13px' : 0 }}>
						{icon}
						{title}
					</Flex>
					{isOpen ? <AccordionChevronUpIcon /> : <AccordionChevronDownIcon />}
				</AccordionWrapper>
				<AccordionContentWrapper isOpen={isOpen}>
					{children}
				</AccordionContentWrapper>
			</Container>
		)
	}
)

Accordion.defaultProps = {
	children: undefined,
	title: undefined,
	icon: undefined,
}

export default Accordion
