import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const UserNotVerified = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button color="#6366f1" onClick={open} size="xl" fullWidth>
        Verified Now!
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="Verify Your Account"
      ></Modal>
    </>
  );
};

export default UserNotVerified;
