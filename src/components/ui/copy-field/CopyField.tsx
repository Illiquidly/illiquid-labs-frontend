import { CopyIcon } from 'assets/icons/action'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { ActionButton, CopyFieldContainer } from './CopyField.styled'

type CopyFieldProps = {
	data: string
}

export const CopyField = ({ data }: CopyFieldProps) => {
	const { t } = useTranslation('trade')
	const [copyText, setCopyText] = useState(t('confirm-listing.copy'))
	return (
		<CopyFieldContainer>
			<span>{data}</span>
			<ActionButton
				type='button'
				data-copyText={copyText}
				onMouseLeave={() => setCopyText(t('confirm-listing.copy'))}
				onClick={() => {
					navigator.clipboard
						.writeText(data)
						.then(() => setCopyText(t('confirm-listing.copied')))
				}}
			>
				<CopyIcon />
			</ActionButton>
		</CopyFieldContainer>
	)
}
