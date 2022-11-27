import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import ImagePlaceholder from 'assets/images/ImagePlaceholder'
import NotificationsEmptyImage from 'assets/images/NotificationsEmptyImage'
import React from 'react'
import { Img } from 'react-image'
import { Box, Flex } from 'theme-ui'

const StyledCard = styled(Flex)`
	flex: 1;
	flex-direction: column;
	padding: 13px 0 8px;
	gap: 10px;

	background: ${props => props.theme.colors.dark400};

	border: 1px solid ${props => props.theme.colors.dark500};

	box-shadow: 0px 25px 50px -12px rgba(48, 69, 113, 0.25);
	border-radius: 10px;
	z-index: ${props => props.theme.zIndices.notification};
`
const StyledHeader = styled(Flex)`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 36px;

	padding: 0 10px;
`

const StyledBody = styled.div<{ fullWidth?: boolean }>`
	display: flex;
	flex-direction: column;
	margin-top: 10px;

	${props =>
		!props.fullWidth &&
		css`
			max-height: 288px;
		`}
`

const Title = styled(Box)`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 20px;
	line-height: 18px;
`

const BodySectionTitle = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
`

const StyledNotification = styled.div<{ active?: boolean }>`
	margin-top: 2px;
	display: flex;

	padding: 12px;
	border-radius: 10px;
	height: 112px;

	&:hover {
		cursor: pointer;
		background: ${props => props.theme.colors.dark300};
	}
`

const StyledMessage = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;

	color: ${props => props.theme.colors.gray1000};
`

const StyledOldMessage = styled(StyledMessage)`
	color: ${props => props.theme.colors.gray600};
`

const StyledTime = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 18px;
`

const Circle = styled.div`
	width: 10px;
	height: 10px;

	background: ${props => props.theme.colors.primary100};
	border-radius: 100%;
`

const ImageWrapper = styled.div`
	display: flex;
	margin-right: 22px;
	position: relative;
	width: 50px;
	height: 50px;

	border-radius: 100%;

	background-color: ${props => props.theme.colors.gray300};
`

const Image = styled(Img)`
	max-width: 100%;
	max-height: 100%;
	overflow: hidden;
	border-radius: 100%;
	position: absolute;
`

const TypeImageWrapper = styled.div`
	position: absolute;
	display: flex;
	width: 24px;
	height: 24px;
	right: -8px;
	bottom: -6px;
	z-index: ${props => props.theme.zIndices.notificationImgType};
`

type NotificationStatus = 'unread' | 'read'

type Notification<T> = {
	id: number
	data: T
	imageUrl: string[]
	typeBadge?: { icon?: React.ReactNode; background: string }
	message?: string
	actionMessage?: string
	status: NotificationStatus
	timeDescription: string
}

interface NotificationCardProps<T> {
	title?: string
	newNotificationsTitle?: string
	oldNotificationsTitle?: string
	newNotifications: Notification<T>[]
	oldNotifications: Notification<T>[]
	onNotificationClick: (data: T) => void
	fullWidth?: boolean
}

export default function NotificationCard<T>({
	title,
	newNotificationsTitle,
	oldNotificationsTitle,
	newNotifications,
	oldNotifications,
	onNotificationClick,
	fullWidth,
}: NotificationCardProps<T>) {
	const theme = useTheme()
	return (
		<StyledCard>
			<StyledHeader>
				<Title>{title}</Title>
			</StyledHeader>
			{!newNotifications.length && !oldNotifications.length && (
				<NotificationsEmptyImage />
			)}
			{Boolean(newNotifications.length) && (
				<StyledBody fullWidth={fullWidth}>
					<Flex sx={{ p: '0 10px' }}>
						<BodySectionTitle>{newNotificationsTitle}</BodySectionTitle>
					</Flex>
					<Flex
						sx={{
							mt: '8px',
							flexDirection: 'column',
							overflow: 'auto',
							p: '0 10px',
						}}
					>
						<Box>
							{newNotifications.map(
								({
									id,
									message,
									actionMessage,
									data,
									timeDescription,
									imageUrl,
									typeBadge,
								}) => (
									<StyledNotification onClick={() => onNotificationClick(data)} key={id}>
										<Box>
											<ImageWrapper>
												{imageUrl?.every(img => img === '') ? (
													<ImagePlaceholder width='25px' height='25px' />
												) : (
													<Image src={imageUrl ?? []} />
												)}
												<TypeImageWrapper>
													{typeBadge && (
														<Flex
															sx={{
																alignItems: 'center',
																justifyContent: 'center',
																borderRadius: '100%',
																flex: 1,
																background: typeBadge.background,
															}}
														>
															{typeBadge.icon}
														</Flex>
													)}
												</TypeImageWrapper>
											</ImageWrapper>
										</Box>
										<Box sx={{ flexDirection: 'column' }}>
											<Box>
												<StyledMessage>{message}</StyledMessage>
												<StyledMessage style={{ color: theme.colors.primary200 }}>
													{actionMessage}
												</StyledMessage>
											</Box>
											<StyledTime style={{ color: theme.colors.primary200 }}>
												{timeDescription}
											</StyledTime>
										</Box>
										<Flex sx={{ alignItems: 'center', marginLeft: 'auto' }}>
											<Circle />
										</Flex>
									</StyledNotification>
								)
							)}
						</Box>
					</Flex>
				</StyledBody>
			)}
			{Boolean(oldNotifications.length) && (
				<StyledBody fullWidth={fullWidth}>
					<Flex sx={{ p: '0 10px' }}>
						<BodySectionTitle>{oldNotificationsTitle}</BodySectionTitle>
					</Flex>
					<Flex
						sx={{
							mt: '8px',
							flexDirection: 'column',
							overflow: 'auto',
							p: '0 10px',
						}}
					>
						<Box>
							{oldNotifications.map(
								({
									id,
									message,
									actionMessage,
									timeDescription,
									data,
									imageUrl,
									typeBadge,
								}) => (
									<StyledNotification onClick={() => onNotificationClick(data)} key={id}>
										<Box>
											<ImageWrapper>
												{imageUrl?.every(img => img === '') ? (
													<ImagePlaceholder width='25px' height='25px' />
												) : (
													<Image src={imageUrl ?? []} />
												)}
												<TypeImageWrapper>
													{typeBadge && (
														<Box
															style={{
																display: 'flex',
																alignItems: 'center',
																justifyContent: 'center',
																borderRadius: '100%',
																flex: 1,
																background: typeBadge.background,
															}}
														>
															{typeBadge.icon}
														</Box>
													)}
												</TypeImageWrapper>
											</ImageWrapper>
										</Box>
										<Box sx={{ flexDirection: 'column' }}>
											<Box>
												<StyledOldMessage>{message}</StyledOldMessage>
												<StyledOldMessage>{actionMessage}</StyledOldMessage>
											</Box>
											<StyledTime>{timeDescription}</StyledTime>
										</Box>
										<Flex sx={{ alignItems: 'center', marginLeft: 'auto' }}>
											<Circle />
										</Flex>
									</StyledNotification>
								)
							)}
						</Box>
					</Flex>
				</StyledBody>
			)}
		</StyledCard>
	)
}

NotificationCard.defaultProps = {
	title: '',
	newNotificationsTitle: '',
	oldNotificationsTitle: '',
	fullWidth: false,
}
