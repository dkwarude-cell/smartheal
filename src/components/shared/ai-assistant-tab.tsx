import React from 'react';

interface AiAssistantTabProps {
  title?: string;
  description?: string;
}

export const AiAssistantTab: React.FC<AiAssistantTabProps> = ({ title = 'AI Assistant', description = 'Ask for guidance or quick tips.' }) => {
  return (
    <div className="p-4 space-y-2 bg-white rounded-xl shadow">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="rounded-lg border border-dashed border-gray-200 p-4 text-sm text-gray-700">
        Chat input placeholder
      </div>
    </div>
  );
};

export default AiAssistantTab;
