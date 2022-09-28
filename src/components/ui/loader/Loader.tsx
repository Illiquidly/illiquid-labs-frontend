import styled from '@emotion/styled'
import React from 'react'
import { Box, Flex } from 'theme-ui'

export interface LoaderProps {
	size?: number
	duration?: number
	shadowDistanceMultiplier?: number
	loadingText?: string
}

const LoadingBoxContainer = styled.div<{
	size: number
	duration: number
}>`
	height: ${props => props.size * 2}px;
	width: ${props => props.size * 3}px;
	position: relative;
	transform-style: preserve-3d;
	transform-origin: 50% 50%;
	margin-top: ${props => props.size * 1.5 * -1}px;
	transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
`
const LoadingBox = styled.div<{
	size: number
	duration: number
	shadowDistanceMultiplier: number
}>`
	@keyframes box1 {
		0%,
		50% {
			transform: translate(100%, 0);
		}
		100% {
			transform: translate(200%, 0);
		}
	}

	@keyframes box2 {
		0% {
			transform: translate(0, 100%);
		}
		50% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(100%, 0);
		}
	}

	@keyframes box3 {
		0%,
		50% {
			transform: translate(100%, 100%);
		}
		100% {
			transform: translate(0, 100%);
		}
	}

	@keyframes box4 {
		0% {
			transform: translate(200%, 0);
		}
		50% {
			transform: translate(200%, 100%);
		}
		100% {
			transform: translate(100%, 100%);
		}
	}
	width: ${props => props.size}px;
	height: ${props => props.size}px;
	top: 0;
	left: 0;
	position: absolute;
	transform-style: preserve-3d;
	&:nth-of-type(1) {
		transform: translate(100%, 0);
		animation: box1 ${props => props.duration}ms linear infinite;
	}
	&:nth-of-type(2) {
		transform: translate(0, 100%);
		animation: box2 ${props => props.duration}ms linear infinite;
	}
	&:nth-of-type(3) {
		transform: translate(100%, 100%);
		animation: box3 ${props => props.duration}ms linear infinite;
	}
	&:nth-of-type(4) {
		transform: translate(200%, 0);
		animation: box4 ${props => props.duration}ms linear infinite;
	}
	& > div {
		--background: #6c90f0;
		--top: auto;
		--right: auto;
		--bottom: auto;
		--left: auto;
		--translateZ: ${props => props.size / 2}px;
		--rotateY: 0deg;
		--rotateX: 0deg;

		position: absolute;
		width: 100%;
		height: 100%;
		background: var(--background);
		top: var(--top);
		right: var(--right);
		bottom: var(--bottom);
		left: var(--left);
		transform: rotateY(var(--rotateY)) rotateX(var(--rotateX))
			translateZ(var(--translateZ));
		&:nth-of-type(1) {
			--top: 0;
			--left: 0;
		}
		&:nth-of-type(2) {
			--background: #6b9cff;
			--right: 0;
			--rotateY: 90deg;
		}
		&:nth-of-type(3) {
			--background: rgb(72, 112, 234);
			--rotateX: -90deg;
		}
		&:nth-of-type(4) {
			--background: #05151d;
			--top: 0;
			--left: 0;
			--translateZ: ${props => props.size * props.shadowDistanceMultiplier * -1}px;
		}
	}
`

const LoadingText = styled.div`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
`

function Loader({
	size = 32,
	duration = 800,
	shadowDistanceMultiplier = 2,
	loadingText = '',
}: LoaderProps) {
	return (
		<Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
			<LoadingBoxContainer size={size} duration={duration}>
				<LoadingBox
					shadowDistanceMultiplier={shadowDistanceMultiplier}
					size={size}
					duration={duration}
				>
					<div />
					<div />
					<div />
					<div />
				</LoadingBox>
				<LoadingBox
					shadowDistanceMultiplier={shadowDistanceMultiplier}
					size={size}
					duration={duration}
				>
					<div />
					<div />
					<div />
					<div />
				</LoadingBox>
				<LoadingBox
					shadowDistanceMultiplier={shadowDistanceMultiplier}
					size={size}
					duration={duration}
				>
					<div />
					<div />
					<div />
					<div />
				</LoadingBox>
				<LoadingBox
					shadowDistanceMultiplier={shadowDistanceMultiplier}
					size={size}
					duration={duration}
				>
					<div />
					<div />
					<div />
					<div />
				</LoadingBox>
			</LoadingBoxContainer>
			<Box sx={{ marginTop: size * shadowDistanceMultiplier }}>
				<LoadingText>{loadingText}</LoadingText>
			</Box>
		</Flex>
	)
}

export default Loader
