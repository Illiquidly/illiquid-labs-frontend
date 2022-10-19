import React from 'react'
import styled from '@emotion/styled'
import { Box, Flex } from 'theme-ui'
import {
	AccordionChevronDownIcon,
	AccordionChevronUpIcon,
} from 'assets/icons/mixed'

const AccordionCardContent = styled.div<{ isOpen?: boolean }>`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	background: ${props => props.theme.colors.dark600};

	border: 1px solid ${props => props.theme.colors.dark500};
	border-radius: 8px;
`

const AccordionCardWrapper = styled(AccordionCardContent)<{ isOpen?: boolean }>`
	flex-direction: column;
	&:hover {
		cursor: pointer;
	}
`

const AccordionCardContentWrapper = styled.div<{ isOpen: boolean }>`
	padding-left: 15px;
	padding-right: 15px;
	padding-bottom: ${props => (props.isOpen ? '15px' : '0')};
	padding-top: ${props => (props.isOpen ? '15px' : '0')};
	width: 100%;
	max-height: ${props => (props.isOpen ? 'unset' : '0')};
	transition: all 0.15s ease-in-out;
	overflow: hidden;
	display: flex;

	font-family: 'Heebo';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
`

const Container = styled(Flex)`
	flex: 1;
	flex-direction: column;
	gap: 8px;
`

export const AccordionCardTitle = styled(Box)`
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 27px;
`

export type AccordionCardRef = {
	open: () => void
	close: () => void
}

type AccordionCardProps = {
	children?: React.ReactNode | React.ReactNode[]
	title?: React.ReactNode | string
	icon?: React.ReactNode
}

const AccordionCard = React.forwardRef<AccordionCardRef, AccordionCardProps>(
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
				<AccordionCardWrapper isOpen={isOpen}>
					<Flex
						onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
						sx={{
							justifyContent: 'space-between',
							alignItems: 'center',
							p: '15px',
						}}
					>
						<Flex sx={{ alignItems: 'center', gap: icon ? '13px' : 0 }}>
							{icon}
							{title}
						</Flex>

						{isOpen ? <AccordionChevronUpIcon /> : <AccordionChevronDownIcon />}
					</Flex>
					<AccordionCardContentWrapper isOpen={isOpen}>
						{children}
					</AccordionCardContentWrapper>
				</AccordionCardWrapper>
			</Container>
		)
	}
)

AccordionCard.defaultProps = {
	children: undefined,
	title: undefined,
	icon: undefined,
}

export default AccordionCard
