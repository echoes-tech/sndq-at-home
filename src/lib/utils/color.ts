// Mảng các màu background và text color cho avatar
const avatarColors = [
  { bgColor: "bg-blue-100", textColor: "text-blue-700" },
  { bgColor: "bg-green-100", textColor: "text-green-700" },
  { bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
  { bgColor: "bg-red-100", textColor: "text-red-700" },
  { bgColor: "bg-purple-100", textColor: "text-purple-700" },
  { bgColor: "bg-pink-100", textColor: "text-pink-700" },
  { bgColor: "bg-indigo-100", textColor: "text-indigo-700" },
  { bgColor: "bg-gray-100", textColor: "text-gray-700" },
];

export function getRandomAvatarColor(): { bgColor: string; textColor: string } {
  const randomIndex = Math.floor(Math.random() * avatarColors.length);
  return avatarColors[randomIndex];
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
