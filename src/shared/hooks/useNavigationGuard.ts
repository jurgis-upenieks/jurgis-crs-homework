import {useEffect} from "react";
import {useRouter} from "next/router";
import {useModal} from "@/widgets";

type Props = {
  isSaveEnabled: boolean;
}

export const useNavigationGuard = ({ isSaveEnabled }: Props) => {
  const router = useRouter();
  const { openModal } = useModal();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSaveEnabled) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    const handleLinkClick = async (event: MouseEvent) => {
      const path = event.composedPath() as HTMLElement[];
      const anchor = path.find((el) => el.tagName === 'A') as HTMLAnchorElement | undefined;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return;
      }

      if (!isSaveEnabled) return;

      event.preventDefault();
      event.stopPropagation();

      const userResponse: string = await new Promise((resolve) => {
        openModal({
          title: 'Unsaved changes',
          detailsText:
            'You have unsaved changes that will be lost if you leave this page. Are you sure you want to leave?',
          buttons: [
            { text: 'Cancel', variant: 'secondary' },
            { text: 'Yes', variant: 'primary' },
          ],
          onButtonClick: resolve,
        });
      });

      if (userResponse === 'Yes') {
        router.push(href);
      }
    };

    document.addEventListener('click', handleLinkClick, true);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, [isSaveEnabled, router, openModal]);
}