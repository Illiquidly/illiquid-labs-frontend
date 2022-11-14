import styled from '@emotion/styled'
import React from 'react'
import Dropzone, { DropzoneProps } from 'react-dropzone'

export interface FileDropZoneProps extends Omit<DropzoneProps, 'children'> {
	children?: React.ReactNode | React.ReactNode[]
}

const Container = styled.div`
	display: flex;

	background: rgba(255, 255, 255, 0.05);

	border: 1px dashed rgba(255, 255, 255, 0.2);

	border-radius: 8px;

	flex: 1;
`

function FileDropZone({ children, ...dropzoneProps }: FileDropZoneProps) {
	return (
		<Dropzone {...dropzoneProps}>
			{({ getRootProps, getInputProps }) => (
				<Container {...getRootProps()}>
					<input {...getInputProps()} />
					{children}
				</Container>
			)}
		</Dropzone>
	)
}

export default FileDropZone
