import React, { useState } from "react";
import { Button, Group, Modal } from "@mantine/core";

const Add = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        size="lg">
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)} color="yellow" radius="xl" size="xl">Open Modal</Button>
      </Group>
    </div>
  );
};

export default Add;
