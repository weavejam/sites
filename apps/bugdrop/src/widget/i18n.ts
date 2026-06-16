// i18n support for BugDrop widget
// Consumers pass a JSON override map via data-i18n attribute on the script tag.
// Keys not present in the override fall back to DEFAULT_STRINGS.

export const DEFAULT_STRINGS = {
  // Trigger button
  triggerLabel: 'Feedback',

  // Welcome screen
  welcomeTitle: 'Share Your Feedback',
  welcomeTagline: 'Help us improve by sharing your thoughts',
  welcomeDescription: 'Report bugs, suggest features, or leave feedback.',
  welcomeScreenshotNote: 'You can optionally include annotated screenshots.',
  welcomeGetStarted: 'Get Started',

  // Feedback form
  formTitle: 'Send Feedback',
  categoryLabel: 'Category',
  categoryBug: '🐛 Bug',
  categoryFeature: '✨ Feature',
  categoryQuestion: '❓ Question',
  titleLabel: 'Title *',
  titlePlaceholder: 'Brief description of the issue or suggestion',
  descriptionLabel: 'Description',
  descriptionPlaceholder: 'Provide additional details, steps to reproduce, or context...',
  nameLabel: 'Name',
  namePlaceholder: 'Your name',
  emailLabel: 'Email',
  emailPlaceholder: 'your@email.com',
  screenshotLabel: '📸 Include a screenshot',
  consoleLogsLabel: 'Send Console Logs',
  uploadLabel: 'Upload',
  cancelBtn: 'Cancel',
  continueBtn: 'Continue',
  submitBtn: 'Submit',

  // Submitting modal
  submittingTitle: 'Submitting...',
  submittingMessage: 'Creating issue...',

  // Error modal
  errorTitle: 'Submission Failed',
  retryBtn: 'Try Again',

  // Success modal
  successTitle: 'Feedback Submitted!',
  successSubmitted: 'Your feedback has been submitted successfully.',
  successIssueCreated: 'Issue #{number} has been created.',
  successViewGitHub: 'View on GitHub',
  successDoneBtn: 'Done',
  poweredBy: 'Powered by BugDrop',

  // Install prompt
  installRequiredTitle: 'Install Required',
  installRequiredMsg: 'BugDrop requires GitHub App installation to create issues.',
  installBtn: 'Install App',
  connectionErrorTitle: 'Connection Error',
} as const;

export type I18nKey = keyof typeof DEFAULT_STRINGS;
export type I18nOverrides = Partial<Record<I18nKey, string>>;

export function t(key: I18nKey, overrides?: I18nOverrides): string {
  return overrides?.[key] ?? DEFAULT_STRINGS[key];
}

export function parseI18nAttr(raw: string | undefined): I18nOverrides {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === 'object' && parsed !== null) return parsed as I18nOverrides;
  } catch {
    console.warn('[BugDrop] Invalid data-i18n JSON. Ignoring.');
  }
  return {};
}
