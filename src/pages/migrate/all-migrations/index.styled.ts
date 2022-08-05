import styled from '@emotion/styled'
import { withAttrs } from 'hoc/withAttrs'
import { Box, Button, Flex } from 'rebass'

export const Container = withAttrs(
	styled(Flex)`
		flex: 1;
		width: 100%;
		flex-direction: column;
	`,
	{
		marginTop: [0, 0],
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

export const SectionTitle = styled.div`
	font-family: Biryani;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;

	color: #89a8cf;
`

export const FilterButton = styled(Button)`
	margin: 0;
	display: flex;
	flex-direction: row;
	border: 1px solid #89a8cf;
	box-sizing: border-box;
	padding: 2px 12px;
	justify-content: center;
	align-items: center;
	height: 30px;
	color: #89a8cf;
	margin-right: 8px;
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
export const MigratorAnimationContainer = styled.div`
	display: flex;
	justify-content: center;
`

export const MigratorImageContainer = withAttrs(
	styled(Box)`
		display: block;
	`,
	{
		height: [100, 150],
		width: [300, 450],
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
