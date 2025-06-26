export function EventDescription({ description }: { description?: string | null }) {
  if (!description) return null;
  return (
    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
      {description.length > 120 ? `${description.substring(0, 120)}...` : description}
    </p>
  );
}
