import prisma from "@/lib/prisma"
import { SignupDetails } from "@/types/auth"

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            contactNumber: true,
            otp: true,
            otpExpiresAt: true,
        }
    })
    if (!user) return null;
    
    return {
        ...user,
        contactNumber: user.contactNumber ? Number(user.contactNumber) : null
    };
}

export const getUserByEmailWithPassword = async (email:string) => {
    const existingUser = await prisma.user.findUnique({
     where: {email}
     })
     if (!existingUser) return null;
     
     return {
         ...existingUser,
         contactNumber: existingUser.contactNumber ? Number(existingUser.contactNumber) : null
     };
}

export const createAccount = async (data: SignupDetails) => {
    try {
        const result = await prisma.$transaction(async (tx) => {
            // Create the user first
            const user = await tx.user.create({
                data: {
                    fullName: data.fullName,
                    contactNumber: data.contactNumber,
                    email: data.email,
                    password: data.password
                },
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    contactNumber: true,
                    role: true,
                }
            });

            // Create the associated account record for email/password authentication
            await tx.account.create({
                data: {
                    userId: user.id,
                    provider: 'credentials', // Use 'credentials' for email/password auth
                    providerAccountId: user.email, // Use email as the provider account ID for credentials
                }
            });

            return user;
        });

        return result ? {
            ...result,
            contactNumber: result.contactNumber ? Number(result.contactNumber) : null
        } : null;
    } catch (error) {
        console.error('Error creating account:', error);
        return null;
    }
}


export const getUserByIdWithBookings = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            bookings: {
                include: {
                    show: {
                        include: {
                            movie: true
                        }
                    }
                }
            }
        }
    })
    if (!user) return null;
    
    return {
        ...user,
        contactNumber: user.contactNumber ? Number(user.contactNumber) : null
    };
}

export const fetchAllUsers = async () => {
    const users = await prisma.user.findMany({
        where: {
            role: 'USER'
        }
    })
    if (!users) return null;
    
    return users.map(user => ({
        ...user,
        contactNumber: user.contactNumber ? Number(user.contactNumber) : null
    }));
}

export const updateOTP = async (email: string, otp: number, otpExpiresAt: number) => {
    const user = await prisma.user.update({
        where: {
            email
        },
        data: {
            otp: otp,
            otpExpiresAt
        }
    })
    return user;
}

export const updatePassword = async (email: string, password: string) => {
    const user = await prisma.user.update({
        where: {
            email
        },
        data: {
            password
        }
    })
    return user ?? null;
}

// New functions for Google OAuth
export const createGoogleUser = async (email: string, fullName: string) => {
    try {
        const user = await prisma.user.create({
            data: {
                fullName,
                email,
                password: null, // Google users don't have passwords
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                contactNumber: true,
                role: true,
            }
        })
        if (!user) return null;
        
        return {
            ...user,
            contactNumber: user.contactNumber ? Number(user.contactNumber) : null
        };
    } catch (error) {
        console.error('Error creating Google user:', error);
        return null;
    }
}

export const createGoogleUserWithAccount = async (email: string, fullName: string, providerAccountId: string) => {
    try {
        const result = await prisma.$transaction(async (tx) => {
            // Create the user first
            const user = await tx.user.create({
                data: {
                    fullName,
                    email,
                    password: null, // Google users don't have passwords
                },
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    contactNumber: true,
                    role: true,
                }
            });

            // Create the associated Google account record
            await tx.account.create({
                data: {
                    userId: user.id,
                    provider: 'google',
                    providerAccountId,
                }
            });

            return user;
        });

        return result ? {
            ...result,
            contactNumber: result.contactNumber ? Number(result.contactNumber) : null
        } : null;
    } catch (error) {
        console.error('Error creating Google user with account:', error);
        return null;
    }
}

export const linkGoogleAccount = async (userId: number, provider: string, providerAccountId: string) => {
    const account = await prisma.account.create({
        data: {
            userId,
            provider,
            providerAccountId,
        }
    })
    return account ?? null;
}

export const getAccountByProvider = async (provider: string, providerAccountId: string) => {
    const account = await prisma.account.findUnique({
        where: {
            provider_providerAccountId: {
                provider,
                providerAccountId,
            }
        },
        include: {
            user: true
        }
    })
    return account ?? null;
}

export const getUserByEmailWithAccounts = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        },
        include: {
            accounts: true
        }
    })
    if (!user) return null;
    
    return {
        ...user,
        contactNumber: user.contactNumber ? Number(user.contactNumber) : null
    };
}

export const getUserByIdWithAccounts = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            accounts: true
        }
    })
    if (!user) return null;
    
    return {
        ...user,
        contactNumber: user.contactNumber ? Number(user.contactNumber) : null
    };
}

export const getAccountsByUserId = async (userId: number) => {
    const accounts = await prisma.account.findMany({
        where: {
            userId
        }
    })
    return accounts ?? [];
}

export const hasAccountWithProvider = async (userId: number, provider: string) => {
    const account = await prisma.account.findFirst({
        where: {
            userId,
            provider
        }
    })
    return !!account;
}

export const deleteAccount = async (userId: number, provider: string) => {
    try {
        const account = await prisma.account.deleteMany({
            where: {
                userId,
                provider
            }
        })
        return account.count > 0;
    } catch (error) {
        console.error('Error deleting account:', error);
        return false;
    }
}