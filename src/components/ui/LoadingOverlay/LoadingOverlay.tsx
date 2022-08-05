import LoadingOverlay from 'react-loading-overlay'
import styled from '@emotion/styled'

export const StyledLoadingOverlay = styled(LoadingOverlay)<{ flex?: boolean }>`
	${props => (props.flex ? `display: flex;` : ``)}
	flex: 1;

	.Primary_overlay {
		background: linear-gradient(
			180deg,
			rgba(229, 236, 245, 0.094) 0%,
			rgba(229, 236, 245, 0) 107.14%,
			rgba(0, 0, 0, 0.1) 107.14%
		);
		backdrop-filter: blur(2px);
	}

	.Secondary_overlay {
		background: transparent;
	}

	&.Primary_wrapper--active {
		overflow: hidden;
	}

	&.Secondary_wrapper--active {
		overflow: hidden;
	}
`
