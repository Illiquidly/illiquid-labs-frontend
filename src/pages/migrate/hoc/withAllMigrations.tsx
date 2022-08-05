/* eslint-disable react/require-default-props */
import React from 'react'
import { MigrationSectionProps } from '../components/MigrationSection/MigrationSection'
import useAllMigrations from '../hooks/useAllMigrations'

export function withAllMigrations(
	WrappedComponent: React.ComponentType<MigrationSectionProps>
) {
	function ComponentWithMigrationsHook(
		props: Omit<
			MigrationSectionProps,
			'loading' | 'migrations' | 'fetchMigrations' | 'lazyLoading'
		>
	) {
		const { allMigrations, loading: allMigrationsLoading } = useAllMigrations()

		return (
			<WrappedComponent
				{...props}
				loading={false}
				migrations={allMigrations}
				lazyLoading={allMigrationsLoading}
			/>
		)
	}

	return ComponentWithMigrationsHook
}
