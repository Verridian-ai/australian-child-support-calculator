import React from 'react';
import { AlertTriangle, CheckCircle, Info, X, Calculator } from 'lucide-react';

interface AlertBannerProps {
  alert: {
    type: 'warning' | 'info' | 'success';
    title: string;
    message: string;
    show: boolean;
  };
  onDismiss: () => void;
  onCalculate: () => void;
}

export default function AlertBanner({ alert, onDismiss, onCalculate }: AlertBannerProps) {
  if (!alert.show) return null;

  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'warning':
        return {
          icon: AlertTriangle,
          bgClass: 'alert-warning',
          iconClass: 'text-semantic-warning',
          buttonClass: 'neumorphic-btn-primary',
          pulseClass: 'animate-pulse-glow',
        };
      case 'info':
        return {
          icon: Info,
          bgClass: 'alert-info',
          iconClass: 'text-semantic-info',
          buttonClass: 'neumorphic-btn-secondary',
          pulseClass: '',
        };
      case 'success':
        return {
          icon: CheckCircle,
          bgClass: 'alert-success',
          iconClass: 'text-semantic-success',
          buttonClass: 'neumorphic-btn-secondary',
          pulseClass: '',
        };
      default:
        return {
          icon: Info,
          bgClass: 'alert-info',
          iconClass: 'text-semantic-info',
          buttonClass: 'neumorphic-btn-secondary',
          pulseClass: '',
        };
    }
  };

  const config = getAlertConfig(alert.type);
  const Icon = config.icon;

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 animate-slide-down`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className={`${config.bgClass} ${config.pulseClass} rounded-lg border backdrop-blur-sm`}>
          <div className="flex items-start space-x-4">
            {/* Icon */}
            <Icon className={`h-6 w-6 ${config.iconClass} flex-shrink-0 mt-0.5`} />
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-text-primary">
                    {alert.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {alert.message}
                  </p>
                  
                  {/* Action Button for wage alerts */}
                  {alert.type === 'warning' && (
                    <div className="mt-3">
                      <button
                        onClick={onCalculate}
                        className="inline-flex items-center space-x-2 text-sm font-medium text-semantic-warning hover:text-semantic-warning/80 transition-colors duration-base"
                      >
                        <Calculator className="h-4 w-4" />
                        <span>Calculate New Estimate</span>
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Close Button */}
                <button
                  onClick={onDismiss}
                  className="ml-4 flex-shrink-0 p-1 text-text-tertiary hover:text-text-primary transition-colors duration-base"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}