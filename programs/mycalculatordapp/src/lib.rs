use anchor_lang::prelude::*;

declare_id!("J6uZUfnZys7fNEVPdqZP4nv195CSrX1ryhD74CHtJiCX");

#[program]
mod hello_anchor {
    use super::*;
    pub fn set_data(ctx: Context<SetData>, data: u64) -> Result<()> {
        ctx.accounts.my_account.data = data;
        Ok(())
    }
}


#[account]
#[derive(Default)]
pub struct MyAccount {
    data: u64
}


#[derive(Accounts)]
pub struct SetData<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>
}