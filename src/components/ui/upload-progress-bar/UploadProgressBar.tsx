import styled from '@emotion/styled'
import { CheckCircleIcon, CloseIcon, DocumentIcon } from 'assets/icons/mixed'
import { noop } from 'lodash'
import React from 'react'
import { Box, Flex, IconButton } from 'theme-ui'

const Container = styled(Flex)`
	flex: 1;
	align-items: center;

	padding: 18px 20px;
	background: rgba(255, 255, 255, 0.05);

	border: 1px solid rgba(255, 255, 255, 0.1);

	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
`

const Content = styled(Flex)`
	flex: 1;
	gap: 20px;
`

const Title = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;

	color: rgba(255, 255, 255, 0.7);
`

const ProgressBarContainer = styled(Flex)`
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	overflow: hidden;
	height: 8px;
	width: 100%;
`

const ProgressPercentage = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	margin-left: 4px;
`

const CloseCircle = styled(Flex)`
	background: ${props => props.theme.colors.gray400};
	border-radius: 100%;
	padding: 5px;
`

interface UploadProgressBarProps {
	title?: string
	progress?: number
	onDismiss?: () => void
}

function UploadProgressBar({
	title,
	progress,
	onDismiss,
}: UploadProgressBarProps) {
	return (
		<Container>
			<Content>
				<Flex sx={{ alignItems: 'center' }}>
					{(progress ?? 0) < 100 ? <DocumentIcon /> : <CheckCircleIcon />}
				</Flex>
				<Flex sx={{ flexDirection: 'column', flex: 1 }}>
					<Flex
						sx={{
							flex: 1,
							alignItems: 'center',
							gap: '12px',
						}}
					>
						<Title>{title}</Title>
						<IconButton type='button' onClick={onDismiss} sx={{ padding: '0px' }}>
							<CloseCircle>
								<CloseIcon width={10} height={10} />
							</CloseCircle>
						</IconButton>
					</Flex>
					<Flex sx={{ flex: 1, alignItems: 'center' }}>
						<ProgressBarContainer>
							<Flex
								sx={{
									width: `${progress ?? 0}%`,
									background: (progress ?? 0) < 100 ? 'primary200' : 'success100',
								}}
							/>
						</ProgressBarContainer>

						<Box>
							<ProgressPercentage>{`${progress}%`}</ProgressPercentage>
						</Box>
					</Flex>
				</Flex>
			</Content>
		</Container>
	)
}

UploadProgressBar.defaultProps = {
	title: '',
	progress: 0,
	onDismiss: noop,
}

export default UploadProgressBar
