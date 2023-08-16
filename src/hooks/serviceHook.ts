import ApiAccountRepository from "../infrastructure/api/impl/ApiAccountRepository";
import ApiAuthRepository from "../infrastructure/api/impl/ApiAuthRepository";
import ApiBudgetProgressRepository from "../infrastructure/api/impl/ApiBudgetProgressRepository";
import ApiBudgetRepository from "../infrastructure/api/impl/ApiBudgetRepository";
import ApiExpenseRepository from "../infrastructure/api/impl/ApiExpenseRepository";
import ApiFixedExpenseRepository from "../infrastructure/api/impl/ApiFixedExpenseRepository";
import ApiIncomeRepository from "../infrastructure/api/impl/ApiIncomeRepository";
import ApiLoanRepository from "../infrastructure/api/impl/ApiLoanRepository";
import ApiTransactionRepository from "../infrastructure/api/impl/ApiTransactionRepository";
import ApiTransferRepository from "../infrastructure/api/impl/ApiTransferRepository";
import ApiUserTrackRepository from "../infrastructure/api/impl/ApiUserTrackRepository";
import FirebaseCategoryRepository from "../infrastructure/firebase/impl/FirebaseCategoryRepository";
import FirebaseGroupRepository from "../infrastructure/firebase/impl/FirebaseGroupRepository";
import FirebasePermissionRepository from "../infrastructure/firebase/impl/FirebasePermissionRepository";
import FirebaseUserPermissionRepository from "../infrastructure/firebase/impl/FirebaseUserPermissionRepository";
import FirebaseUserRepository from "../infrastructure/firebase/impl/FirebaseUserRepository";
import AccountService from "../usecases/AccountService";
import AuthService from "../usecases/AuthService";
import BudgetProgressService from "../usecases/BudgetProgressService";
import BudgetService from "../usecases/BudgetService";
import CategoryService from "../usecases/CategoryService";
import ExpenseService from "../usecases/ExpenseService";
import FixedExpenseService from "../usecases/FixedExpenseService";
import GroupService from "../usecases/GroupService";
import IncomeService from "../usecases/IncomeService";
import LoanService from "../usecases/LoanService";
import PermissionService from "../usecases/PermissionService";
import TransactionService from "../usecases/TransactionService";
import TransferService from "../usecases/TransferService";
import UserPermissionService from "../usecases/UserPermissionService";
import UserService from "../usecases/UserService";
import UserTrackService from "../usecases/UserTrackService";


export const useService = () => {

    const repositories = {
        group: new FirebaseGroupRepository(),
        auth: new ApiAuthRepository(),
        permission: new FirebasePermissionRepository(),
        category: new FirebaseCategoryRepository(),
        userPermission: new FirebaseUserPermissionRepository(),
        user: new FirebaseUserRepository(),
        account: new ApiAccountRepository(),
        transfer: new ApiTransferRepository(),
        budget: new ApiBudgetRepository(),
        income: new ApiIncomeRepository(),
        expense: new ApiExpenseRepository(),
        budgetProgress: new ApiBudgetProgressRepository(),
        userTrack: new ApiUserTrackRepository(),
        transaction: new ApiTransactionRepository(),
        loan: new ApiLoanRepository(),
        fixedExpense: new ApiFixedExpenseRepository(),
    }


    const groupService = new GroupService(
        repositories.group,
    );

    const authService = new AuthService(
        repositories.auth,
    );

    const permissionService = new PermissionService(
        repositories.permission,
    );

    const categoryService = new CategoryService(
        repositories.category,
    );

    const userPermissionService = new UserPermissionService(
        repositories.userPermission,
    );
    
    const userService = new UserService(
        repositories.user,
    );

    const userBudgetService = new UserTrackService(
        repositories.userTrack,
    )

    const accountService = new AccountService(
        repositories.account,
    );
    
    const transferService = new TransferService(
        repositories.transfer,        
    );

    const budgetService = new BudgetService(
        repositories.budget,
    );

    const budgetProgressService = new BudgetProgressService(
        repositories.budgetProgress,
    )

    const incomeService = new IncomeService(
        repositories.income,
    )

    const expenseService = new ExpenseService(
        repositories.expense,
    )

    const transactionService = new TransactionService(
        repositories.transaction,
    )

    const loanService = new LoanService(
        repositories.loan,
    )

    const fixedExpenseService = new FixedExpenseService(
        repositories.fixedExpense,
    )

    return {
        groupService,
        authService,
        permissionService,
        categoryService,
        userPermissionService,
        userService,
        accountService,
        transferService,
        budgetService,
        budgetProgressService,
        incomeService,
        expenseService,
        userBudgetService,
        transactionService,
        loanService,
        fixedExpenseService,
    }
}