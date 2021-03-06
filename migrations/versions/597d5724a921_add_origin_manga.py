"""add_origin_manga

Revision ID: 597d5724a921
Revises: 1298b037320c
Create Date: 2015-06-29 05:04:00.311281

"""

# revision identifiers, used by Alembic.
revision = '597d5724a921'
down_revision = '1298b037320c'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tb_manga', sa.Column('origin', sa.Unicode(length=255), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tb_manga', 'origin')
    ### end Alembic commands ###
