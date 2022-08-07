import styled from '@emotion/styled'
import { Button } from 'components/ui/Button/Button'
import { withAttrs } from 'hoc/withAttrs'
import { Box, Flex } from 'rebass'

export const MainContainer = styled.div`
	display: flex;
	flex: 1;
	justify-content: center;
	overflow: auto;
`

export const TitleContainer = withAttrs(
	styled(Box)`
		display: flex;
		justify-content: center;
		padding: 4px 0;
	`,
	{
		marginLeft: [0, '24px'],
	}
)

export const Title = withAttrs(
	styled(Box)`
		font-family: 'Pixelade';
		font-style: normal;
		font-weight: normal;

		color: #e5ecf5;
	`,
	{
		fontSize: [24, 28, 42],
	}
)

export const ToastLink = styled.a`
	color: #fff;

	&:hover {
		color: #fff;
		opacity: 0.6;
	}
`
export const MigratorContainer = withAttrs(
	styled(Flex)`
		display: flex;
	`,
	{
		marginTop: ['14px', '32px'],
		flexDirection: ['column', 'column', 'column', 'row'],
	}
)

export const ButtonContainer = withAttrs(
	styled(Flex)`
		display: flex;
	`,
	{
		marginTop: ['24px', '24px', '24px', 0],
		width: ['100%', 'unset'],
	}
)

export const MigratorImageContainer = withAttrs(
	styled(Box)`
		display: block;
	`,
	{
		height: [100, 150],
		width: [300, 450],
	}
)

export const Card = styled.div`
	flex-direction: column;
	background: #18283d;
	display: flex;
	padding: 16px;

	border: 1px solid transparent;
	border-radius: 10px;
	background: linear-gradient(0deg, #18283d 0%, #18283d 100%),
		linear-gradient(90deg, #01c46c 0%, #3697f0 100%);
	background-clip: padding-box, border-box;
	background-origin: padding-box, border-box;
`

export const FeeCard = withAttrs(
	styled(Box)`
		flex-direction: row;
		align-items: center;
		padding: 10px 14px;
		border-radius: 4px;
		background: #18283d;
	`,
	{
		marginRight: [0, 0, 0, 2],
		marginTop: ['14px', '14px', '14px', 0],
	}
)

export const FeeText = styled.div`
	font-family: Pixelade;
	font-size: 22px;
`

export const MigrationPreviewText = withAttrs(
	styled(Box)<{ color?: string }>`
		font-family: 'Biryani';
		font-style: normal;
		font-weight: 400;

		color: ${props => (props.color ? props.color : '#89A8CF')};
	`,
	{
		fontSize: ['12px', '20px'],
	}
)

export const BroadcastingTrxContainer = styled.div`
	display: flex;
	justify-content: center;
`

export const BroadcastingTrxContent = withAttrs(
	styled(Box)`
		display: flex;
	`,
	{
		height: ['100%', '120px'],
		width: ['100%', '370px'],
	}
)

export const ModalActionsContainer = withAttrs(
	styled(Flex)`
		justify-content: center;
		flex: 1;
	`,
	{
		padding: ['0 20px', '0 20px', '0 120px'],
		paddingTop: ['12px', '0'],
	}
)

export const ModalCancelButton = withAttrs(
	styled(Button)<{ disabled?: boolean }>`
		flex: 1;
		text-align: center;
		justify-content: center;

		background: #18283d !important;
	`,
	{
		fontSize: ['14px !important', '18px !important', '22px  !important'],
	}
)

export const ModalConfirmButton = withAttrs(
	styled(Button)`
		flex: 1;
		text-align: center;
		justify-content: center;
	`,
	{
		fontSize: ['14px !important', '18px !important', '22px  !important'],
	}
)

export const MigrationDescriptionContainer = styled.div`
	display: flex;
	margin-top: 12px;
	flex-direction: row;
`
