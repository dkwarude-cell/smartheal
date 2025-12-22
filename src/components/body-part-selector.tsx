import React, { useState } from 'react';
import { Button } from './ui/button';
import bodyFrontImage from 'figma:asset/7095044444fdeafd79b94287e16df9ebf9518b58.png';
import bodyBackImage from 'figma:asset/7aadc715c5bb3f35405d38b3addd85f65427bd94.png';

interface BodyPartSelectorProps {
  onNext: (selectedParts: string[]) => void;
  onSkip: () => void;
}

type BodyView = 'front' | 'back';

interface BodyPart {
  id: string;
  name: string;
  x: number; // percentage from left
  y: number; // percentage from top
  width: number;
  height: number;
}

// Define clickable body part regions (approximate positions)
const frontBodyParts: BodyPart[] = [
  { id: 'head', name: 'Head', x: 42, y: 8, width: 16, height: 12 },
  { id: 'neck', name: 'Neck', x: 44, y: 20, width: 12, height: 6 },
  { id: 'left-shoulder', name: 'Left Shoulder', x: 28, y: 24, width: 14, height: 8 },
  { id: 'right-shoulder', name: 'Right Shoulder', x: 58, y: 24, width: 14, height: 8 },
  { id: 'chest', name: 'Chest', x: 40, y: 28, width: 20, height: 12 },
  { id: 'left-upper-arm', name: 'Left Upper Arm', x: 22, y: 32, width: 10, height: 14 },
  { id: 'right-upper-arm', name: 'Right Upper Arm', x: 68, y: 32, width: 10, height: 14 },
  { id: 'abdomen', name: 'Abdomen', x: 40, y: 42, width: 20, height: 12 },
  { id: 'left-forearm', name: 'Left Forearm', x: 20, y: 46, width: 8, height: 14 },
  { id: 'right-forearm', name: 'Right Forearm', x: 72, y: 46, width: 8, height: 14 },
  { id: 'left-hand', name: 'Left Hand', x: 18, y: 60, width: 8, height: 8 },
  { id: 'right-hand', name: 'Right Hand', x: 74, y: 60, width: 8, height: 8 },
  { id: 'left-thigh', name: 'Left Thigh', x: 38, y: 56, width: 10, height: 16 },
  { id: 'right-thigh', name: 'Right Thigh', x: 52, y: 56, width: 10, height: 16 },
  { id: 'left-knee', name: 'Left Knee', x: 38, y: 72, width: 10, height: 6 },
  { id: 'right-knee', name: 'Right Knee', x: 52, y: 72, width: 10, height: 6 },
  { id: 'left-shin', name: 'Left Shin', x: 38, y: 78, width: 10, height: 14 },
  { id: 'right-shin', name: 'Right Shin', x: 52, y: 78, width: 10, height: 14 },
  { id: 'left-foot', name: 'Left Foot', x: 36, y: 92, width: 12, height: 6 },
  { id: 'right-foot', name: 'Right Foot', x: 52, y: 92, width: 12, height: 6 },
];

const backBodyParts: BodyPart[] = [
  { id: 'head-back', name: 'Head (Back)', x: 42, y: 8, width: 16, height: 12 },
  { id: 'neck-back', name: 'Neck (Back)', x: 44, y: 20, width: 12, height: 6 },
  { id: 'left-shoulder-back', name: 'Left Shoulder (Back)', x: 28, y: 24, width: 14, height: 8 },
  { id: 'right-shoulder-back', name: 'Right Shoulder (Back)', x: 58, y: 24, width: 14, height: 8 },
  { id: 'upper-back', name: 'Upper Back', x: 40, y: 28, width: 20, height: 12 },
  { id: 'left-upper-arm-back', name: 'Left Upper Arm (Back)', x: 22, y: 32, width: 10, height: 14 },
  { id: 'right-upper-arm-back', name: 'Right Upper Arm (Back)', x: 68, y: 32, width: 10, height: 14 },
  { id: 'lower-back', name: 'Lower Back', x: 40, y: 42, width: 20, height: 12 },
  { id: 'left-forearm-back', name: 'Left Forearm (Back)', x: 20, y: 46, width: 8, height: 14 },
  { id: 'right-forearm-back', name: 'Right Forearm (Back)', x: 72, y: 46, width: 8, height: 14 },
  { id: 'left-hand-back', name: 'Left Hand (Back)', x: 18, y: 60, width: 8, height: 8 },
  { id: 'right-hand-back', name: 'Right Hand (Back)', x: 74, y: 60, width: 8, height: 8 },
  { id: 'left-glute', name: 'Left Glute', x: 38, y: 54, width: 10, height: 10 },
  { id: 'right-glute', name: 'Right Glute', x: 52, y: 54, width: 10, height: 10 },
  { id: 'left-hamstring', name: 'Left Hamstring', x: 38, y: 64, width: 10, height: 14 },
  { id: 'right-hamstring', name: 'Right Hamstring', x: 52, y: 64, width: 10, height: 14 },
  { id: 'left-calf', name: 'Left Calf', x: 38, y: 78, width: 10, height: 14 },
  { id: 'right-calf', name: 'Right Calf', x: 52, y: 78, width: 10, height: 14 },
  { id: 'left-foot-back', name: 'Left Foot (Back)', x: 36, y: 92, width: 12, height: 6 },
  { id: 'right-foot-back', name: 'Right Foot (Back)', x: 52, y: 92, width: 12, height: 6 },
];

export function BodyPartSelector({ onNext, onSkip }: BodyPartSelectorProps) {
  const [view, setView] = useState<BodyView>('front');
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [clickedPart, setClickedPart] = useState<string | null>(null);

  const bodyParts = view === 'front' ? frontBodyParts : backBodyParts;
  const bodyImage = view === 'front' ? bodyFrontImage : bodyBackImage;

  const handlePartClick = (partId: string) => {
    // Animate the clicked part
    setClickedPart(partId);
    setTimeout(() => setClickedPart(null), 300);

    // Toggle selection
    setSelectedParts(prev => {
      if (prev.includes(partId)) {
        return prev.filter(id => id !== partId);
      } else {
        return [...prev, partId];
      }
    });
  };

  const handleNext = () => {
    onNext(selectedParts);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col safe-top">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Select the Type of Injury
        </h1>
        <p className="text-sm text-gray-600">
          Record any injuries you've experienced. Select from common areas or specify your own to ensure personalized care.
        </p>
      </div>

      {/* Front/Back Toggle */}
      <div className="px-6 pb-4">
        <div className="inline-flex rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setView('front')}
            className={`px-6 py-2 rounded-md transition-all duration-200 ${
              view === 'front'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Front
          </button>
          <button
            onClick={() => setView('back')}
            className={`px-6 py-2 rounded-md transition-all duration-200 ${
              view === 'back'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Back
          </button>
        </div>
      </div>

      {/* Body Image with Clickable Regions */}
      <div className="flex-1 px-6 pb-4 flex items-center justify-center">
        <div className="relative w-full max-w-md mx-auto">
          {/* Body Image */}
          <img
            src={bodyImage}
            alt={`Body ${view} view`}
            className="w-full h-auto"
          />

          {/* Clickable Overlay Regions */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {bodyParts.map((part) => {
              const isSelected = selectedParts.includes(part.id);
              const isClicked = clickedPart === part.id;

              return (
                <g key={part.id}>
                  {/* Clickable area */}
                  <rect
                    x={part.x}
                    y={part.y}
                    width={part.width}
                    height={part.height}
                    className={`cursor-pointer pointer-events-auto transition-all duration-200 ${
                      isSelected
                        ? 'fill-red-500 opacity-40'
                        : 'fill-transparent hover:fill-red-300 hover:opacity-30'
                    } ${
                      isClicked
                        ? 'animate-ping-once'
                        : ''
                    }`}
                    onClick={() => handlePartClick(part.id)}
                    rx="2"
                  />
                  
                  {/* Selection indicator */}
                  {isSelected && (
                    <>
                      <rect
                        x={part.x}
                        y={part.y}
                        width={part.width}
                        height={part.height}
                        className="fill-none stroke-red-500 stroke-2 pointer-events-none animate-pulse-border"
                        rx="2"
                      />
                      <circle
                        cx={part.x + part.width / 2}
                        cy={part.y + part.height / 2}
                        r="2"
                        className="fill-red-500 animate-pulse"
                      />
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Parts Display */}
      {selectedParts.length > 0 && (
        <div className="px-6 pb-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-red-900 mb-2">
              Selected Areas ({selectedParts.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedParts.map((partId) => {
                const part = bodyParts.find(p => p.id === partId);
                return (
                  <span
                    key={partId}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm"
                  >
                    {part?.name}
                    <button
                      onClick={() => handlePartClick(partId)}
                      className="ml-2 hover:text-red-900"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-6 pb-8 pt-4 space-y-3 border-t border-gray-200 bg-white">
        <Button
          onClick={handleNext}
          disabled={selectedParts.length === 0}
          className="w-full h-12 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </Button>
        
        <Button
          onClick={onSkip}
          variant="outline"
          className="w-full h-12 border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-lg"
        >
          I don't have any
        </Button>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes ping-once {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-ping-once {
          animation: ping-once 0.3s ease-out;
        }

        @keyframes pulse-border {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse-border {
          animation: pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
