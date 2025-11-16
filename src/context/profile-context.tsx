"use client";
import React, { createContext, useContext } from "react";
import { User } from "@/generated/prisma";

type ProfileState = Partial<User> | null;
type ProfileSetter = React.Dispatch<React.SetStateAction<ProfileState>>;

type ProfileContextType = {
  user: ProfileState;
  setUser: ProfileSetter;
};

const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

export const ProfileProvider = ({
  user,
  setUser,
  children,
}: {
  user: ProfileState;
  setUser: ProfileSetter;
  children: React.ReactNode;
}) => {
  return (
    <ProfileContext.Provider value={{ user, setUser }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return ctx;
};
