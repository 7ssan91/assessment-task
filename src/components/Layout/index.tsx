import React from 'react';
import { AppErrorBoundary } from '../AppErrorBoundary';
import { AppFooter } from './Footer';
import { AppHeader } from './Header';

export const AppLayout: React.FC<{ showNav?: boolean, children: any }> = ({
    showNav = true,
    children,
}) => {
    return (
        <>
            <AppErrorBoundary>{showNav && <AppHeader />}</AppErrorBoundary>
            <AppErrorBoundary>
                <main className='fui-flex fui-w-full fui-flex-col fui-flex-nowrap'>
                    {children}
                </main>
            </AppErrorBoundary>
            <AppErrorBoundary>{showNav && <AppFooter />}</AppErrorBoundary>
        </>
    );
};
