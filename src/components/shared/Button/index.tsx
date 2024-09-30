import React from 'react';
import cx from 'clsx';
import styles from './Button.module.css';
export type TStylesClass = {
    [key: string]: string;
};

export type ButtonStyles =
    | 'primary'
    | 'secondary'
    | 'ternary'
    | 'outlinePrimary'
    | 'addToCart'
    | 'outlineSecondary'
    | 'outlineTernary'
    | 'primaryUnderline'
    | 'basicUnderline'
    | 'primaryText'
    | 'basicText';

export type ButtonSizes =
    | '2xs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl';

export type ButtonCases = 'lower' | 'upper' | 'normal';

export type ButtonRadius =
    | 'none'
    | 'sm'
    | 'default'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | 'full';

export interface ButtonProps extends React.ComponentProps<'button'> {
    label?: string | null;
    buttonStyle?: ButtonStyles;
    size?: ButtonSizes;
    rounded?: ButtonRadius;
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    overrideClass?: string | null;
    disabled?: boolean;
    cases?: ButtonCases;
    testid?: string;
    isProcessing?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children = null,
    label = null,
    className = '',
    type = 'button',
    buttonStyle = 'primary',
    size = 'md',
    rounded = 'none',
    overrideClass = null,
    disabled = false,
    cases = 'normal',
    testid = 'TestId__Button',
    isProcessing = false,
    ...buttonProps
}) => {
    const cssClass =
        overrideClass ??
        cx(
            styles.btn,
            styles[`btn-${buttonStyle}`],
            styles[`btn-size-${size}`],
            styles[`btn-rounded-${rounded}`],
            styles[`btn-cases-${cases}`],
            className
        );

    return (
        <button
            type={type}
            className={cssClass}
            disabled={disabled}
            {...buttonProps}
            data-testid={testid}
        >
            {isProcessing ? (
                <div
                    className={cx(
                        'absolute z-10 flex h-full w-full items-center justify-center bg-white'
                    )}
                >
                </div>
            ) : null}
            {children || label}
        </button>
    );
};
