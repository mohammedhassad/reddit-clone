import { firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import {
  RedditImagePostFillIcon,
  RedditImagePostIcon,
  RedditLinkPostFillIcon,
  RedditLinkPostIcon,
  RedditPollPostFillIcon,
  RedditPollPostIcon,
  RedditTextPostFillIcon,
  RedditTextPostIcon,
} from "@/styles/icons";
import { Alert, AlertIcon, Flex, Icon, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import ImageUpload from "./ImageUpload";
import TabItem from "./TabItem";
import TextInputs from "./TextInputs";

const formTabs: TabItemType[] = [
  {
    title: "Post",
    // icon: IoDocumentText,
    icon: RedditTextPostIcon,
    selectedIcon: RedditTextPostFillIcon,
  },
  {
    title: "Images & Video",
    // icon: IoImageOutline,
    icon: RedditImagePostIcon,
    selectedIcon: RedditImagePostFillIcon,
  },
  {
    title: "Link",
    // icon: BsLink45Deg,
    icon: RedditLinkPostIcon,
    selectedIcon: RedditLinkPostFillIcon,
  },
  {
    title: "Poll",
    // icon: BiPoll,
    icon: RedditPollPostIcon,
    selectedIcon: RedditPollPostFillIcon,
  },
  // {
  //   title: "Talk",
  //   icon: BsMic,
  // },
];

export type TabItemType = {
  title: string;
  icon: typeof Icon.arguments;
  selectedIcon: typeof Icon.arguments;
};

type Props = {
  // communityId: string;
  communityImageURL?: string;
  user: User;
};

const NewPostForm: React.FC<Props> = ({ user, communityImageURL }) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreatePost = async () => {
    setLoading(true);
    const { communityId } = router.query;
    const { title, body } = textInputs;

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), {
        communityId: communityId as string,
        communityImageURL: communityImageURL || "",
        creatorId: user.uid,
        userDisplayText: user.email!.split("@")[0],
        title,
        body,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp() as Timestamp,
        editedAt: serverTimestamp() as Timestamp,
      });

      console.log("HERE IS NEW POST ID", postDocRef.id);

      // // check if selectedFile exists, if it does, do image processing
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });

        console.log("HERE IS DOWNLOAD URL", downloadURL);
      }

      router.back();
    } catch (err: any) {
      console.log("handleCreatePost error", err.message);
      setError("Error creating post");
    }

    setLoading(false);
  };

  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item, index) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            selectFileRef={selectFileRef}
            onSelectImage={onSelectFile}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text>error</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
