export function toLowercase(message: string | undefined): React.ReactNode {
  if (message) {
    return message.toLowerCase();
  }
  return null; // or some default value
}
