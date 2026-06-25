import { CheckCircleIcon } from './icons';

interface SuccessAlertProps {
  message: string;
  className?: string;
}

/** Green success banner used after create/update/delete actions. */
export default function SuccessAlert({ message, className = 'mb-4' }: SuccessAlertProps) {
  if (!message) return null;

  return (
    <div className={`alert alert-success ${className}`}>
      <CheckCircleIcon />
      <span>{message}</span>
    </div>
  );
}
