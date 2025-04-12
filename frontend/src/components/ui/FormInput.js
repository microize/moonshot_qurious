// src/components/ui/FormInput.js
import React from 'react';
import { classNames } from '../../utils/styleUtils';
import { inputStyles, labelStyles } from '../../styles/components';

/**
 * FormInput component for text inputs
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Input ID (required for accessibility)
 * @param {string} [props.name] - Input name attribute
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.label] - Input label
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {string} [props.value] - Input value
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.variant='default'] - Input style variant
 * @param {string} [props.size='md'] - Input size
 * @param {boolean} [props.disabled=false] - Whether input is disabled
 * @param {boolean} [props.readOnly=false] - Whether input is read-only
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.helperText] - Helper text to display
 * @param {boolean} [props.required=false] - Whether input is required
 * @param {ReactNode} [props.prefix] - Content to display before input
 * @param {ReactNode} [props.suffix] - Content to display after input
 * @param {string} [props.className=''] - Additional CSS classes
 */
const FormInput = ({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  variant = 'default',
  size = 'md',
  disabled = false,
  readOnly = false,
  error,
  helperText,
  required = false,
  prefix,
  suffix,
  className = '',
  ...props
}) => {
  // Get appropriate classes based on variant, size, and state
  const baseClasses = inputStyles.base;
  const variantClasses = error 
    ? inputStyles.variants.error 
    : inputStyles.variants[variant] || inputStyles.variants.default;
  const sizeClasses = inputStyles.sizes[size] || inputStyles.sizes.md;
  
  // Additional state classes
  const stateClasses = disabled 
    ? inputStyles.states.disabled 
    : readOnly 
      ? inputStyles.states.readOnly 
      : '';
  
  // Padding adjustments for prefix/suffix
  const paddingClasses = classNames(
    prefix ? 'pl-10' : '',
    suffix ? 'pr-10' : ''
  );
  
  // Combine all input classes
  const inputClasses = classNames(
    baseClasses,
    variantClasses,
    sizeClasses,
    stateClasses,
    paddingClasses,
    className
  );
  
  // Label classes
  const labelClassNames = classNames(
    labelStyles.base,
    error ? 'text-error-600 dark:text-error-400' : ''
  );

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label htmlFor={id} className={labelClassNames}>
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input with optional prefix/suffix */}
      <div className="relative">
        {/* Prefix */}
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {prefix}
          </div>
        )}
        
        {/* Input element */}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className={inputClasses}
          {...props}
        />
        
        {/* Suffix */}
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {suffix}
          </div>
        )}
      </div>
      
      {/* Error message or helper text */}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-error-600 dark:text-error-400">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default FormInput;