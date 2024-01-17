import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input Component', () => {
    test('renders the Input component correctly', () => {
        render(
            <Input
                dataTestId="test-id"
                name="testName"
                label="Test Label"
                inputType="text"
                placeholder="Enter text"
                cssClasses="custom-styles"
                onChange={() => {}}
                value="testValue"
                visible={false}
                toggleVisibility={() => {}}
            />
        );

        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    test('handles input changes correctly', () => {
        const onChangeMock = jest.fn();
        render(
            <Input
                dataTestId="test-id"
                name="testName"
                label="Test Label"
                inputType="text"
                placeholder="Enter text"
                cssClasses="custom-styles"
                onChange={onChangeMock}
                value="testValue"
                visible={false}
                toggleVisibility={() => {}}
            />
        );

        fireEvent.change(screen.getByPlaceholderText('Enter text'), { target: { value: 'newText' } });

        expect(onChangeMock).toHaveBeenCalledWith('newText');
    });

    test('toggles visibility correctly', () => {
        const toggleVisibilityMock = jest.fn();
        render(
            <Input
                dataTestId="test-id"
                name="testName"
                label="Test Label"
                inputType="password"
                placeholder="Enter password"
                cssClasses="custom-styles"
                onChange={() => {}}
                value="testValue"
                visible={false}
                toggleVisibility={toggleVisibilityMock}
            />
        );

        fireEvent.click(screen.getByTestId('toggle-visibility'));

        expect(toggleVisibilityMock).toHaveBeenCalled();
    });

    test('renders EyeIcon when visible is false', () => {
        render(
            <Input
                dataTestId="test-id"
                name="testName"
                label="Test Label"
                inputType="password"
                placeholder="Enter password"
                cssClasses="custom-styles"
                onChange={() => {}}
                value="testValue"
                visible={false}
                toggleVisibility={() => {}}
            />
        );

        expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
    });

    test('renders EyeSlashIcon when visible is true', () => {
        render(
            <Input
                dataTestId="test-id"
                name="testName"
                label="Test Label"
                inputType="password"
                placeholder="Enter password"
                cssClasses="custom-styles"
                onChange={() => {}}
                value="testValue"
                visible={true}
                toggleVisibility={() => {}}
            />
        );

        expect(screen.getByTestId('eye-slash-icon')).toBeInTheDocument();
    });
});
