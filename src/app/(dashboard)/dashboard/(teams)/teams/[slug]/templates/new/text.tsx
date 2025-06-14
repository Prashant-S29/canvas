'use client';

import { AddIcon } from 'public/icons';
import type React from 'react';
import { useState, useRef, useCallback } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

interface Field {
  id: string;
  title: string;
  x: number;
  y: number;
  isEditing: boolean;
}

interface QRCode {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Test: React.FC = () => {
  // states
  const [certificateURL, setCertificateURL] = useState<string | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  // fields
  const [fields, setFields] = useState<Field[]>([]);
  const [draggedField, setDraggedField] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // QR code state
  const [qrCode, setQRCode] = useState<QRCode | null>(null);
  const [draggedQR, setDraggedQR] = useState<boolean>(false);
  const [resizingQR, setResizingQR] = useState<boolean>(false);
  const [qrDragOffset, setQRDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const certificateImageRef = useRef<HTMLImageElement>(null); // Ref to the image for its dimensions

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCertificateURL(url);
      setCertificateFile(file);
      setFields([]);
      setQRCode(null); // Reset QR code when a new certificate is uploaded
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const addQR = useCallback(() => {
    if (!qrCode) {
      setQRCode({
        x: 200,
        y: 200,
        width: 100, // Initial square size
        height: 100, // Initial square size
      });
    }
  }, [qrCode]);

  const removeQR = useCallback(() => {
    setQRCode(null);
  }, []);

  const addField = useCallback(() => {
    setFields((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: '',
        x: 100,
        y: 100,
        isEditing: true, // Start in editing mode for new fields
      },
    ]);
  }, []);

  const removeField = useCallback((id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const updateField = useCallback((id: string, data: Partial<Field>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...data } : f)));
  }, []);

  const handleQRMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!qrCode) return;

      const rect = e.currentTarget.getBoundingClientRect();
      setDraggedQR(true);
      setQRDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [qrCode],
  );

  const handleQRResize = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setResizingQR(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!certificateImageRef.current) return;

      const imageRect = certificateImageRef.current.getBoundingClientRect();
      // const imageX = imageRect.left;
      // const imageY = imageRect.top;
      const imageWidth = imageRect.width;
      const imageHeight = imageRect.height;

      // Ensure the container is the relative parent for positioning
      const containerRect = e.currentTarget.getBoundingClientRect

      if (draggedField) {
        const fieldElement = document.getElementById(`field-${draggedField}`);
        const fieldWidth = fieldElement?.offsetWidth || 0;
        const fieldHeight = fieldElement?.offsetHeight || 0;

        let newX = e.clientX - containerRect.left - dragOffset.x;
        let newY = e.clientY - containerRect.top - dragOffset.y;

        // Calculate based on the image's relative position within the container
        const relativeImageLeft = imageRect.left - containerRect.left;
        const relativeImageTop = imageRect.top - containerRect.top;

        // Boundary checks for fields
        newX = Math.max(relativeImageLeft, newX);
        newX = Math.min(relativeImageLeft + imageWidth - fieldWidth, newX);
        newY = Math.max(relativeImageTop, newY);
        newY = Math.min(relativeImageTop + imageHeight - fieldHeight, newY);

        updateField(draggedField, { x: newX, y: newY });
      }

      if (draggedQR && qrCode) {
        let newX = e.clientX - containerRect.left - qrDragOffset.x;
        let newY = e.clientY - containerRect.top - qrDragOffset.y;

        // Calculate based on the image's relative position within the container
        const relativeImageLeft = imageRect.left - containerRect.left;
        const relativeImageTop = imageRect.top - containerRect.top;

        // Boundary checks for QR code
        newX = Math.max(relativeImageLeft, newX);
        newX = Math.min(relativeImageLeft + imageWidth - qrCode.width, newX);
        newY = Math.max(relativeImageTop, newY);
        newY = Math.min(relativeImageTop + imageHeight - qrCode.height, newY);

        setQRCode({ ...qrCode, x: newX, y: newY });
      }

      if (resizingQR && qrCode) {
        // Calculate based on the image's relative position within the container
        const relativeImageLeft = imageRect.left - containerRect.left;
        const relativeImageTop = imageRect.top - containerRect.top;

        // Max possible width/height from QR code's current position to image edge
        const maxAllowedWidth = relativeImageLeft + imageWidth - qrCode.x;
        const maxAllowedHeight = relativeImageTop + imageHeight - qrCode.y;

        // Calculate new potential width and height from mouse position
        const potentialNewWidth = e.clientX - containerRect.left - qrCode.x;
        const potentialNewHeight = e.clientY - containerRect.top - qrCode.y;

        // Ensure minimum size and cap at allowed maximums relative to QR code's current position
        const minSize = 50; // Minimum size for QR code
        let newSize = Math.max(
          minSize,
          Math.min(potentialNewWidth, potentialNewHeight), // Take the smaller to ensure it's within both bounds
        );

        // Further cap `newSize` based on the image boundaries
        newSize = Math.min(newSize, maxAllowedWidth, maxAllowedHeight);

        setQRCode({
          ...qrCode,
          width: newSize,
          height: newSize,
        });
      }
    },
    [
      draggedField,
      dragOffset.x,
      dragOffset.y,
      updateField,
      draggedQR,
      qrCode,
      qrDragOffset.x,
      qrDragOffset.y,
      resizingQR,
    ],
  );

  const handleMouseUp = useCallback(() => {
    setDraggedField(null);
    setDragOffset({ x: 0, y: 0 });
    setDraggedQR(false);
    setResizingQR(false);
    setQRDragOffset({ x: 0, y: 0 });
  }, []);

  const handleDoubleClick = useCallback(
    (fieldId: string) => {
      updateField(fieldId, { isEditing: true });
    },
    [updateField],
  );

  const handleInputBlur = useCallback(
    (fieldId: string) => {
      updateField(fieldId, { isEditing: false });
    },
    [updateField],
  );

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent, fieldId: string) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        updateField(fieldId, { isEditing: false });
      }
    },
    [updateField],
  );

  const handleSubmit = useCallback(() => {
    const titles = fields.map((f) => f.title.trim());
    const hasEmptyTitles = titles.some((title) => title === '');
    const hasDuplicateTitles = new Set(titles).size !== titles.length;

    if (hasEmptyTitles) {
      alert('All fields must have a title');
      return;
    }

    if (hasDuplicateTitles) {
      alert('All titles must be unique');
      return;
    }

    const result = {
      certificateName: certificateFile?.name || 'unknown',
      fields: fields.map(({ title, x, y }) => ({ title, x, y })),
      qrCode: qrCode
        ? {
            x: qrCode.x,
            y: qrCode.y,
            width: qrCode.width,
            height: qrCode.height,
          }
        : null,
    };

    console.log(result);
    alert('Check console for results!');
  }, [certificateFile?.name, fields, qrCode]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, field: Field) => {
      if (field.isEditing) return; // Prevent dragging while editing the input

      const rect = e.currentTarget.getBoundingClientRect();
      setDraggedField(field.id);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [],
  );

  return (
    <>
      <div className="flex gap-3 p-4">
        <Button size="sm" onClick={addField}>
          <AddIcon /> Add Field
        </Button>
        <Button size="sm" onClick={addQR} disabled={!!qrCode}>
          Add QR
        </Button>
        <Button size="sm" onClick={handleSubmit}>
          Submit
        </Button>
        <Button size="sm" onClick={openFileDialog}>
          Change Certificate
        </Button>
      </div>
      <div className="w-full h-full relative overflow-hidden">
        {' '}
        {/* overflow-hidden to clip dragging outside */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          onChange={handleFileUpload}
          className="hidden"
          aria-label="Upload Certificate File"
        />
        {!certificateURL ? (
          <div className="flex items-center justify-center h-[calc(100vh-100px)]">
            <Button
              onClick={openFileDialog}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors border-2 border-blue-500 hover:border-blue-600"
            >
              Upload Certificate
            </Button>
          </div>
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves the container
          >
            <img
              ref={certificateImageRef}
              src={certificateURL}
              alt="Uploaded Certificate"
              className="max-w-full max-h-[80vh] object-contain"
              draggable={false}
              onLoad={() => {
                // You might want to adjust field/QR positions if the image dimensions change drastically
                // For now, they just re-render and boundaries apply
              }}
            />

            {fields.map((field) => (
              <div
                key={field.id}
                id={`field-${field.id}`} // Add ID for easier DOM element access
                className={`absolute select-none ${
                  field.isEditing ? 'cursor-text' : 'cursor-move'
                } ${draggedField === field.id ? 'z-10' : 'z-0'}`}
                style={{
                  left: field.x,
                  top: field.y,
                }}
                onMouseDown={(e) => handleMouseDown(e, field)}
                onDoubleClick={() => handleDoubleClick(field.id)}
              >
                <div className="group border border-transparent relative p-2 hover:border-blue-400 transition-colors">
                  <Input
                    type="text"
                    placeholder="title"
                    value={field.title}
                    onChange={(e) =>
                      updateField(field.id, { title: e.target.value })
                    }
                    onBlur={() => handleInputBlur(field.id)}
                    onKeyDown={(e) => handleInputKeyDown(e, field.id)}
                    className={`px-3 py-1 w-fit ${
                      field.isEditing
                        ? 'bg-white border border-blue-300 rounded cursor-text'
                        : 'bg-transparent border-none cursor-move'
                    }`}
                    readOnly={!field.isEditing}
                    autoFocus={field.isEditing}
                    aria-label={`Field title for ${field.id}`}
                    onClick={(e) => e.stopPropagation()} // Prevent dragging when clicking input
                  />
                  <Button
                    onClick={() => removeField(field.id)}
                    className="absolute rounded-full -top-2 -right-2 h-5 w-5 text-xs flex items-center justify-center bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity p-0"
                    onMouseDown={(e) => e.stopPropagation()} // Prevent dragging when clicking remove button
                    aria-label={`Remove field ${field.id}`}
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ))}

            {qrCode && (
              <div
                className={`absolute select-none cursor-move border-2 border-dashed border-gray-400 bg-gray-100/50 flex items-center justify-center ${
                  draggedQR ? 'z-20' : 'z-0'
                }`}
                style={{
                  left: qrCode.x,
                  top: qrCode.y,
                  width: qrCode.width,
                  height: qrCode.height,
                }}
                onMouseDown={handleQRMouseDown}
              >
                <div className="group relative w-full h-full">
                  <div className="text-gray-600 text-center font-medium pointer-events-none">
                    QR Code
                  </div>{' '}
                  {/* Make text not interactable for dragging */}
                  <Button
                    onClick={removeQR}
                    className="absolute rounded-full -top-2 -right-2 h-5 w-5 text-xs flex items-center justify-center bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity p-0"
                    onMouseDown={(e) => e.stopPropagation()} // Prevent dragging when clicking remove button
                    aria-label="Remove QR code"
                  >
                    ✕
                  </Button>
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize hover:bg-blue-600 transition-colors"
                    onMouseDown={handleQRResize}
                    aria-label="Resize QR code"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
