import PasswordSettingsView from '@/app/shared/account-settings/password-settings';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Password'),
};

export default function ProfileSettingsFormPage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <PasswordSettingsView
      settings={{
        currentPassword: '',
        newPassword: '',
        confirmedPassword: '',
      }}
    />
  );
}
